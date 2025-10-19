export default function AuthHeadline({ headline }: { headline: string }) {
  // Login & Register Headline
  return (
    <h1
      className="text-maroon-700 dark:text-softPink-300 font-normal text-center mb-6
                   text-5xl leading-[100%] tracking-[0] font-edwardian capitalize pb-4 border-b border-zinc-200 dark:border-zinc-600"
    >
      {headline}
    </h1>
  );
}
