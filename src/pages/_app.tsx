import { type AppType } from "next/dist/shared/lib/utils";
import { Jost, Inter } from "next/font/google";
import "import/styles/globals.css";
import { Toaster } from "sonner";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${jost.variable}`} id="myapp">
      <Toaster
        expand
        visibleToasts={1}
        position="top-center"
        closeButton
        duration={3500}
      />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
