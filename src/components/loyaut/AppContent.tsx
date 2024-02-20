import { Layout } from "antd";
import { FC } from "react";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
};

const AppContent: FC = () => {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
};

export default AppContent;
