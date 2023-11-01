import EntitiesPanel from "import/components/panels/Entities/EntitiesPanel";
import Head from "next/head";
import CustomizationPanel from "import/components/panels/Customization/CustomizationPanel";
import PreviewPanel from "import/components/panels/Preview/PreviewPanel";
import CodePanel from "import/components/panels/Code/CodePanel";
import { ErrorBanner } from "import/components/micro/ErrorBanner";
import { Debugger } from "import/components/Debugger";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:no-scrollbar flex h-full flex-col flex-nowrap items-center justify-start overflow-auto bg-a_light font-jost md:max-h-full md:flex-wrap p-4">
        <ErrorBanner />
        <EntitiesPanel />
        {/* <CustomizationPanel /> */}
        {/* <PreviewPanel /> */}
        {/* <CodePanel /> */}
        <Debugger />
      </div>
    </>
  );
}
