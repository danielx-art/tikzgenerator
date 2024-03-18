import Head from "next/head";
import LayoutV2 from "import/layouts/v2/LayoutV2";

export default function Home() {
  return (
    <>
      <Head>
        <title>GeoSimples</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full overflow-auto font-jost">
        {/* <ThreePanels /> */}
        <LayoutV2 />
        {/* <Debugger /> */}
      </div>
    </>
  );
}
