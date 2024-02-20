import { Layout } from "antd";
import { FC } from "react";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const AppSider: FC = () => {
  return <Layout.Sider style={siderStyle}>Sider</Layout.Sider>;
};

export default AppSider;
