import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import Router from "./route/router";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetSettingData } from "./queries/settings.query";
import { BASE_IMAGE_URL } from "./utils/linkActiveChecker";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import { ReactPlugin } from "@stagewise-plugins/react";

if (typeof window !== "undefined") {
  import("bootstrap");
}

function SetFaviconFromSetting() {
  const { data } = useGetSettingData();
  const headerData = data?.data || [];

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    if (headerData.length > 0) {
      const faviconPath = formatImageUrl(headerData[0]?.fav_icon);
      if (faviconPath) {
        let link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = faviconPath;
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    }
  }, [headerData]);

  return null;
}

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="page-wrapper">
          <BrowserRouter>
            {/* ✅ Inject dynamic favicon */}
            <SetFaviconFromSetting />
            <Router />
            <ScrollTopBehaviour />
          </BrowserRouter>
          <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
          <ToastContainer
            position="bottom-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <ScrollToTop />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
