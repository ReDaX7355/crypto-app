import { Card, Layout, List, Spin, Statistic, Tag, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import ICrypto from "../../types/ICrypto";
import IAssets from "../../types/IAssets";
import { capitilize, getPercentFromTwoNumbers } from "../../utils";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

const AppSider: FC = () => {
  const data = useSelector((state: RootState) => state.data);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<IAssets[] | []>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      setAssets(
        data.assets.map((asset) => {
          const coin =
            data.crypto.find((item) => item.id === asset.id) || ({} as ICrypto);
          return {
            grow: asset.price < coin.price,
            growPercent: getPercentFromTwoNumbers(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );

      setLoading(false);
    }

    preload();
  }, [data]);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
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
              // {
              //   title: "Diffrence",
              //   value: asset.growPercent,
              //   suffix: "%",
              // },
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
