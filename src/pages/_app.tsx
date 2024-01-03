import { type AppType } from "next/dist/shared/lib/utils";
import { Jost } from "next/font/google";
import "import/styles/globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${jost.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
