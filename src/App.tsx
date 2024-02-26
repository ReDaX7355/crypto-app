import { Layout, Spin } from "antd";
import AppHeader from "./components/loyaut/AppHeader";
import AppSider from "./components/loyaut/AppSider";
import AppContent from "./components/loyaut/AppContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cryptoLoading, cryptoRecived } from "./context/cryptoSlice";
import { fakeFetchCryptoData } from "./api";
import { RootState } from "./context/store";

const App = () => {
  const loading = useSelector((state: RootState) => state.crypto.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    async function preload() {
      dispatch(cryptoLoading());
      dispatch(cryptoRecived(await fakeFetchCryptoData()));
    }

    preload();
  }, [dispatch]);

  if (loading == "pending") return <Spin fullscreen />;

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
