import FirstRow from './_components/first-row';

export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="bg-zinc-50 ms-[18.9375rem] mt-[4.375rem] pt-[1.625rem] pe-[1.5625rem] ps-4">
      {/* Overview of overall statistics + categories */}
      <FirstRow locale={locale} />
      
    </div>
  );
}
