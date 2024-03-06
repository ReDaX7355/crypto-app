import { FC } from "react";
import ICrypto from "../types/ICrypto";
import { Divider, Flex, Tag, Typography } from "antd";
import Link from "antd/es/typography/Link";
import { RedditCircleFilled, XOutlined } from "@ant-design/icons";

interface CoinInfoModalProps {
  coin: ICrypto | undefined;
}

const CoinInfoModal: FC<CoinInfoModalProps> = ({ coin }) => {
  return (
    <>
      <Flex align="center">
        <img
          src={coin?.icon}
          alt={coin?.name}
          style={{ width: "40px", marginRight: "15px" }}
        />
        <Typography.Title level={2} style={{ margin: "0", marginTop: "-7px" }}>
          ({coin?.symbol}) {coin?.name}
        </Typography.Title>
      </Flex>
      <Divider style={{ margin: "15px 0" }} />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag
          color={
            coin?.priceChange1h && coin?.priceChange1h > 0 ? "green" : "red"
          }
        >
          {coin?.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag
          color={
            coin?.priceChange1d && coin?.priceChange1d > 0 ? "green" : "red"
          }
        >
          {coin?.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag
          color={
            coin?.priceChange1w && coin?.priceChange1w > 0 ? "green" : "red"
          }
        >
          {coin?.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Price: {coin?.price.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Price in BTC: {coin?.priceBtc}</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Market Cap: {coin?.marketCap}</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>
          Contract Adress:{" "}
          {coin?.contractAddress ? coin?.contractAddress : "None"}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Website: </Typography.Text>
        <Link href={coin?.websiteUrl}>{coin?.websiteUrl}</Link>
      </Typography.Paragraph>
      <Divider style={{ margin: "15px 0" }} />
      <Flex gap={15}>
        <Link
          href={coin?.redditUrl}
          title={coin?.redditUrl}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <RedditCircleFilled style={{ color: "#ff4500", fontSize: "35px" }} />
          Reddit
        </Link>
        <Link
          href={coin?.twitterUrl}
          title={coin?.twitterUrl}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <XOutlined style={{ color: "#111", fontSize: "35px" }} />
          Twitter
        </Link>
      </Flex>
    </>
  );
};

export default CoinInfoModal;
