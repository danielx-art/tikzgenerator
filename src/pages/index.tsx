import EntitiesPanel from "import/components/panels/Entities/EntitiesPanel";
import Head from "next/head";
import CustomizationPanel from "import/components/panels/Customization/CustomizationPanel";
import PreviewPanel from "import/components/panels/Preview/PreviewPanel";
import { ErrorBanner } from "import/components/micro/ErrorBanner";
import { Debugger } from "import/components/micro/Debugger";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:no-scrollbar h-full flex flex-col overflow-auto bg-c_base p-4 font-jost md:max-h-full md:grid md:grid-cols-[2fr_2fr_3fr] gap-4">
        <ErrorBanner />
        <EntitiesPanel />
        <CustomizationPanel />
        <PreviewPanel />
        <Debugger />
      </div>
    </>
  );
}
