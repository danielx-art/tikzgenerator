import Head from "next/head";
import { ErrorBanner } from "import/components/micro/ErrorBanner";
import { Debugger } from "import/components/micro/Debugger";
import ThreePanels from "import/layouts/panels/ThreePanels";
import LayoutV2 from "import/layouts/v2/LayoutV2";


export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full font-jost overflow-auto">
        <ErrorBanner />
        {/* <ThreePanels /> */}
        <LayoutV2 />
        <Debugger />
      </ div>
    </>
  );
}
