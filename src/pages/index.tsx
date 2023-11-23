import Head from "next/head";
import { ErrorBanner } from "import/components/micro/ErrorBanner";
import { Debugger } from "import/components/micro/Debugger";
import LeftPanel from "import/components/panels/Left/LeftPanel";
import MiddlePanel from "import/components/panels/Middle/MIddlePanel";
import RightPanel from "import/components/panels/Right/RightPanel";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:no-scrollbar flex h-full flex-col gap-4 overflow-auto bg-c_base p-4 font-jost md:grid md:max-h-full md:grid-cols-[2fr_2fr_3fr]">
        <ErrorBanner />
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
        <Debugger />
      </div>
    </>
  );
}
