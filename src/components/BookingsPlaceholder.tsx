type Props = {
  onCtaClick: () => void;
};

export default function BookingsPlaceholder({ onCtaClick }: Props) {
  return (
    <section className="flex flex-col items-center text-center font-medium">
      <figure className="relative">
        <figure
          style={{ animationDuration: "2.25s" }}
          className="absolute right-0 -z-10 animate-pulse text-5xl"
        >
          🌞
        </figure>
        <figure className="mr-4 mt-3 -scale-x-100 text-9xl">🏖️</figure>
      </figure>

      <p>You have no bookings... yet.</p>
      <p>
        C&apos;mon, adventurer!{" "}
        <button
          type="button"
          onClick={onCtaClick}
          className="font-semibold text-primary outline-none hover:underline focus:underline"
        >
          Let&apos;s plan
        </button>{" "}
        something cool.{" "}
        <span className="inline" role="emoji">
          😎
        </span>
      </p>
    </section>
  );
}
