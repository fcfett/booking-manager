import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
} & ReactModalProps;

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  ...props
}: Props) {
  return (
    <>
      <ReactModal
        {...props}
        isOpen={isOpen}
        shouldCloseOnEsc
        onRequestClose={onClose}
        shouldCloseOnOverlayClick
        appElement={document.body}
        shouldReturnFocusAfterClose
        overlayClassName={twMerge(
          "flex bg-black/50 backdrop-blur-sm fixed inset-0 z-50 p-4 overflow-auto",
          overlayClassName as string,
        )}
        className={twMerge(
          "m-auto flex max-w-md flex-1 flex-col rounded-lg bg-white outline-none shadow-2xl border",
          className as string,
        )}
      >
        <header className="flex items-center border-b p-4">
          <h1 className="flex-1 text-lg font-bold text-primary">{title}</h1>
          <button
            onClick={onClose}
            className="text-gray-300 outline-none transition-colors hover:text-black focus:text-black"
          >
            <XMarkIcon className="h-5 w-5 stroke-[3px]" />
          </button>
        </header>
        {children}
      </ReactModal>
    </>
  );
}
