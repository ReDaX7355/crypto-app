import { Button, Drawer, Flex, Layout, Modal, Select, Space } from "antd";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import CoinInfoModal from "../CoinInfoModal";
import ICrypto from "../../types/ICrypto";
import AddAssetForm from "../AddAssetForm";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#40a6ff",
  display: "flex",
  alignItems: "center",
};

const AppHeader: FC = () => {
  const crypto = useSelector((state: RootState) => state.crypto);
  const [onOpenSelect, setOnOpenSelect] = useState(false);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const [onOpenDrawer, setOnOpenDrawer] = useState(false);
  const [currentCoin, setCurrentCoin] = useState<ICrypto>();

  useEffect(() => {
    const openSelect = (event: KeyboardEvent) => {
      if (event.code == "Slash") {
        setOnOpenSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", openSelect);

    return () => {
      document.removeEventListener("keypress", openSelect);
    };
  }, []);

  const handleChangeSelect = () => {
    setOnOpenSelect((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    const coin = crypto.data.find((item) => item.id === value);
    setCurrentCoin(coin);
    setOnOpenModal(true);
  };

  const handleClickButton = () => {
    setOnOpenDrawer(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
        <Select
          placeholder={`Select coin (press "/")`}
          open={onOpenSelect}
          style={{ width: 200 }}
          onClick={handleChangeSelect}
          onSelect={handleSelect}
          options={
            crypto.data &&
            crypto.data.map((item) => {
              return {
                icon: item.icon,
                value: item.id,
                label: item.name,
              };
            })
          }
          optionRender={(option) => (
            <Space>
              <img
                style={{
                  width: 20,
                  paddingTop: 6,
                }}
                src={option.data.icon}
                alt={option.data.label}
              />
              {option.data.label}
            </Space>
          )}
        />
        <Button type="primary" onClick={handleClickButton}>
          Add asset
        </Button>
      </Flex>

      <Modal
        open={onOpenModal}
        onCancel={() => setOnOpenModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={currentCoin} />
      </Modal>

      <Drawer
        title="Add asset"
        width={500}
        open={onOpenDrawer}
        onClose={() => setOnOpenDrawer(false)}
        destroyOnClose
      >
        <AddAssetForm onCloseDrawer={() => setOnOpenDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
