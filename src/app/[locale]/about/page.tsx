import { getTranslations } from "next-intl/server"

export default async function Page() {
    // translations 
    const t =await getTranslations("homepage.header");
  return (
    <main>
        <h1>{t("about")}</h1>
    </main>
  )
}
