export default function AuthHeadline({ headline }: { headline: string }) {
  return (
    <h1
      className="
        font-edwardian text-6xl whitespace-nowrap  text-maroon-700 dark:text-softPink-300 font-normal italic leading-none tracking-tight  text-center    pb-4 border-b border-zinc-200 dark:border-zinc-600
      "
    >
      {headline}
    </h1>
  );
}
