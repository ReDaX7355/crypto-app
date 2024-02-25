import { Button, Flex, Image, Layout, Select, Space } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  display: "flex",
  alignItems: "center",
};

const AppHeader: FC = () => {
  const data = useSelector((state: RootState) => state.data);

  return (
    <Layout.Header style={headerStyle}>
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
        <Select
          placeholder="Select coin"
          style={{ width: 200 }}
          // onChange={handleChange}
          options={data.crypto.map((item) => {
            return {
              icon: item.icon,
              value: item.id,
              label: item.name,
            };
          })}
          optionRender={(option) => (
            <Space>
              <div style={{ maxWidth: "20px" }}>
                <Image width="100%" src={option.data.icon} />
              </div>
              {option.data.label}
            </Space>
          )}
        />
        <Button type="primary">Add asset</Button>
      </Flex>
    </Layout.Header>
  );
};

export default AppHeader;
