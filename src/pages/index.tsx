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
      <div className="flex flex-col flex-wrap items-center justify-start h-full md:max-h-full font-jost bg-a_light overflow-auto">
        <EntitiesPanel />
        <CustomizationPanel />
        {/* <PreviewPanel /> */}
        {/* <CodePanel /> */}
      </div>
    </>
  );
}
