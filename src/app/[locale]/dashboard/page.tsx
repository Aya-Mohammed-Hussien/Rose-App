import FirstRow from "./_components/first-row";

// src/app/[locale]/dashboard/page.tsx
export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <div >

      <FirstRow locale={locale} />

    </div>
  );
}

