import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

export default function MainTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <header className="relative flex justify-center bg-pink-500 text-white">
        <div className="flex max-w-screen-4xl flex-1 items-center gap-4 p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            <PaperAirplaneIcon className="inline-flex h-5 w-5 -translate-y-0.5 -rotate-45 stroke-[.15em] text-secondary" />
            Booking
            <span className="text-secondary">.me</span>
          </h1>
        </div>
      </header>
      <main className="relative z-0 flex flex-1 justify-center overflow-hidden">
        <div className="relative flex h-full max-w-screen-4xl flex-1 flex-col gap-4 overflow-auto p-4">
          {children}
        </div>
      </main>
    </>
  );
}
