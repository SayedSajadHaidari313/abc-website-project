import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { Suspense, useEffect, lazy } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetSettingData } from "./queries/settings.query";
import { BASE_IMAGE_URL } from "./utils/linkActiveChecker";
import FontLoader from "./components/common/FontLoader";

// Lazy load Router
const Router = lazy(() => import("./route/router"));

// Lazy load Bootstrap
if (typeof window !== "undefined") {
  import("bootstrap").catch(console.error);
}

function SetFaviconFromSetting() {
  const { data, isLoading, error } = useGetSettingData();
  const headerData = data?.data || [];

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    if (headerData && headerData.fav_icon) {
      const faviconPath = formatImageUrl(headerData.fav_icon);
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

  if (isLoading) return null;
  if (error) console.error("Error loading favicon:", error);
  return null;
}

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        suspense: false,
        useErrorBoundary: false,
      },
      mutations: {
        useErrorBoundary: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <FontLoader />
      <SetFaviconFromSetting />
      <Provider store={store}>
        <div className="page-wrapper">
          <BrowserRouter>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Router />
            {/* </Suspense> */}
            <ScrollTopBehaviour />
          </BrowserRouter>
          <ScrollToTop />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
