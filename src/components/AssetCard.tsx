import { Card, Flex, List, Statistic, Tag, Typography } from "antd";
import IAssets from "../types/IAssets";
import { FC, memo } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";

interface AssetCardProps {
  asset: IAssets;
  deleteCard: (id: string) => void;
}

const AssetCard: FC<AssetCardProps> = memo(function AssetCard({
  asset,
  deleteCard,
}) {
  console.log("Card render!");

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Flex align="start" justify="space-between">
        <Statistic
          title={asset.name}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
          prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        ></Statistic>
        <CloseOutlined
          className="close_button"
          onClick={() => deleteCard(asset.id)}
        />
      </Flex>

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
  );
});

export default AssetCard;
