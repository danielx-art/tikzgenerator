import EntitiesPanel from "import/components/panels/Entities/EntitiesPanel";
import Head from "next/head";
import CustomizationPanel from "import/components/panels/Customization/CustomizationPanel";
import PreviewPanel from "import/components/panels/Preview/PreviewPanel";
import CodePanel from "import/components/panels/Code/CodePanel";
import { ErrorBanner } from "import/components/micro/ErrorBanner";
import { Debugger } from "import/components/micro/Debugger";
import Slider from "import/components/micro/Slider";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:no-scrollbar h-full overflow-auto bg-a_light p-4 font-jost md:max-h-full grid sm:grid-cols-3 md:grid-cols-[2fr_2fr_3fr] gap-4">
        <ErrorBanner />
        {/* <Slider
          min={0}
          max={100}
          onChange={(newValue: number) => {}}
          getValueFromPosition={(pos: number) => pos}
        /> */}
        <EntitiesPanel />
        <CustomizationPanel />
        <PreviewPanel />
        {/* <CodePanel /> */}
        {/* <Debugger /> */}
      </div>
    </>
  );
}
