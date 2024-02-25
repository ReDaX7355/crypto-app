import { Layout, Spin } from "antd";
import AppHeader from "./components/loyaut/AppHeader";
import AppSider from "./components/loyaut/AppSider";
import AppContent from "./components/loyaut/AppContent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadAssets, loadCrypto } from "./context/dataSlice";
import { fakeFetchCryptoData, fetchAssets } from "./api";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function preload() {
      dispatch(loadCrypto(await fakeFetchCryptoData()));
      dispatch(loadAssets(await fetchAssets()));
      setLoading(false);
    }

    preload();
  }, [dispatch]);

  if (loading) return <Spin fullscreen />;

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
