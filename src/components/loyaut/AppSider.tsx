import { Flex, Layout, Skeleton, Typography } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { deleteAsset } from "../../context/assetsSlice";
import AssetCard from "../AssetCard";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
  width: "100%",
};

const skeletonStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "40px 20px",
  borderRadius: 10,
};

const AppSider: FC = () => {
  const { assets } = useSelector((state: RootState) => ({
    assets: state.assets,
  }));

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteAsset(id));
  };

  if (assets.data.length < 1) {
    return (
      <Layout.Sider width="350px" style={siderStyle} className="sider">
        <Typography.Title
          level={3}
          style={{ color: "#fff", textAlign: "center" }}
        >
          Not assets yet
        </Typography.Title>
        ;
      </Layout.Sider>
    );
  }

  if (assets.loading === "pending") {
    return (
      <Layout.Sider width="350px" style={siderStyle} className="sider">
        <Flex vertical gap={20} style={{ height: "100%" }}>
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
        </Flex>
      </Layout.Sider>
    );
  }

  console.log("Sider render!");

  return (
    <Layout.Sider width="350px" style={siderStyle} className="sider">
      <Typography.Title level={3} style={{ color: "#fff" }}>
        Assets
      </Typography.Title>
      <Flex
        vertical
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 140px)",
          padding: "0 1rem 0 0",
        }}
      >
        {assets.data.map((asset, id) => (
          <AssetCard key={id} asset={asset} deleteCard={handleDelete} />
        ))}
      </Flex>
    </Layout.Sider>
  );
};

export default AppSider;
