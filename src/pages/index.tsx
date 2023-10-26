import PointList from "import/components/PointList";
import EntitiesPanel from "import/components/EntitiesPanel";
import Head from "next/head";
import CustomizationPanel from "import/components/CustomizationPanel";
import PreviewPanel from "import/components/PreviewPanel";
import CodePanel from "import/components/CodePanel";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="no-scrollbar flex h-full flex-col flex-wrap items-center justify-start overflow-auto bg-a_light font-jost md:max-h-full">
        <EntitiesPanel />
        <CustomizationPanel />
        {/* <PreviewPanel /> */}
        {/* <CodePanel /> */}
      </div>
    </>
  );
}
