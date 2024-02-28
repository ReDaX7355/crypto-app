import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";

interface LoaderProps {
  backgroundSpinner?: string;
  sizeSpinner?: number;
}

const Loader: FC<LoaderProps> = ({
  backgroundSpinner = "transparent",
  sizeSpinner = 40,
}) => {
  return (
    <Spin
      fullscreen
      style={{ background: backgroundSpinner }}
      indicator={<LoadingOutlined style={{ fontSize: sizeSpinner }} spin />}
    />
  );
};

export default Loader;
