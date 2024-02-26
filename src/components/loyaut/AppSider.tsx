import {
  Card,
  Flex,
  Layout,
  List,
  Skeleton,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import ICrypto from "../../types/ICrypto";
import IAssets from "../../types/IAssets";
import { capitilize, getPercentFromTwoNumbers } from "../../utils";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { assetsLoading, assetsRecived } from "../../context/assetsSlice";
import { fetchAssets } from "../../api";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

const skeletonStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "40px 20px",
  borderRadius: 10,
};

const AppSider: FC = () => {
  const { crypto, assets } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [assetsData, setAssetsData] = useState<IAssets[] | []>([]);

  useEffect(() => {
    async function preload() {
      dispatch(assetsLoading());
      dispatch(assetsRecived(await fetchAssets()));
    }

    preload();
  }, [dispatch]);

  useEffect(() => {
    async function preload() {
      setAssetsData(
        assets.data.map((asset) => {
          const coin =
            crypto.data.find((item) => item.id === asset.id) || ({} as ICrypto);
          return {
            grow: asset.price < coin.price,
            growPercent: getPercentFromTwoNumbers(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );
    }

    preload();
  }, [crypto, assets]);

  if (assets.loading === "pending") {
    return (
      <Layout.Sider width="25%" style={siderStyle}>
        <Flex vertical gap={20} style={{ height: "100%" }}>
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
        </Flex>
      </Layout.Sider>
    );
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assetsData.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitilize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          ></Statistic>
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                suffix: "$",
                withtag: true,
              },
              {
                title: "Amount",
                value: asset.amount,
                suffix: "",
                isPlane: true,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  <Typography.Text type={asset.grow ? "success" : "danger"}>
                    {item.withtag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlane && item.value + item.suffix}
                    {!item.isPlane && item.value?.toFixed(2) + item.suffix}
                  </Typography.Text>
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
