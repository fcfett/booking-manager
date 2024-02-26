import { ReactNode } from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import { twMerge } from "tailwind-merge";

import Button from "./Button";

type Props = {
  title: string;
  isOpen: boolean;
  message: ReactNode;
  onDecline: () => void;
  onConfirm: () => void;
} & ReactModalProps;

export default function ConfirmDialog({
  title,
  isOpen,
  message,
  className,
  onDecline,
  onConfirm,
  overlayClassName,
  ...props
}: Props) {
  return (
    <>
      <ReactModal
        {...props}
        isOpen={isOpen}
        shouldCloseOnEsc={false}
        onRequestClose={onDecline}
        appElement={document.body}
        shouldReturnFocusAfterClose
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={false}
        overlayClassName={twMerge(
          "flex backdrop-blur-xs fixed inset-0 z-50 p-4",
          overlayClassName as string,
        )}
        className={twMerge(
          "m-auto flex max-w-xs border flex-col rounded-lg bg-white outline-none shadow-2xl text-center",
          className as string,
        )}
      >
        <header className="flex items-center border-b p-4">
          <h1 className="flex-1 text-lg font-bold text-primary">{title}</h1>
        </header>
        <p className="p-4">{message}</p>
        <footer className="flex justify-center gap-2 border-t p-4">
          <Button isOutline onClick={onDecline}>
            No
          </Button>
          <Button onClick={onConfirm}>Yes</Button>
        </footer>
      </ReactModal>
    </>
  );
}
