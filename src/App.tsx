import { Layout } from "antd";
import AppHeader from "./components/loyaut/AppHeader";
import AppSider from "./components/loyaut/AppSider";
import AppContent from "./components/loyaut/AppContent";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCrypto } from "./context/cryptoSlice";
import { AppDispatch, RootState } from "./context/store";
import Loader from "./components/UI/Loader";

const App = () => {
  const loading = useSelector((state: RootState) => state.crypto.loading);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(loadCrypto());
  }, [dispatch]);

  if (loading == "pending") return <Loader sizeSpinner={50} />;

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default App;
