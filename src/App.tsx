import { Layout } from "antd";
import AppHeader from "./components/loyaut/AppHeader";
import AppSider from "./components/loyaut/AppSider";
import AppContent from "./components/loyaut/AppContent";

const App = () => {
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
