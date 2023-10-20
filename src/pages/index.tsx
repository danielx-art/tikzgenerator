import PointList from "import/components/PointList";
import Tabs from "import/components/Tabs";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TikZ Generatot</title>
        <meta name="description" content="Generates TikZ scripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <Tabs />
      </div>
    </>
  );
}
