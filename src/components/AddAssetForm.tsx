import { useState } from "react";
import ICrypto from "../types/ICrypto";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

type FieldType = {
  amount?: number;
  price?: string;
  datetime?: string;
  total?: string;
};

const validateMessages = {
  required: "'${label}' is required!",
  types: {
    number: "'${label}' is not valid number",
  },
  number: {
    range: "'${label}' must be between ${min} and ${max}",
  },
};

const AddAssetForm = () => {
  const crypto = useSelector((state: RootState) => state.crypto);
  const [coin, setCoin] = useState<ICrypto>();
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    console.log(values);
  };

  const handleAmountChange = (value: number | null) => {
    if (value !== null) {
      form.setFieldValue("total", (value * (coin?.price || 0)).toFixed(2));
    } else {
      form.setFieldValue("total", 0);
    }
  };

  if (!coin) {
    return (
      <Select
        placeholder={`Select coin (press "/")`}
        style={{ width: "100%" }}
        onSelect={(value) =>
          setCoin(crypto.data.find((item) => item.id == value))
        }
        options={crypto.data.map((item) => {
          return {
            icon: item.icon,
            value: item.id,
            label: item.name,
          };
        })}
        optionRender={(option) => (
          <Space>
            <div style={{ maxWidth: "20px" }}>
              <img
                style={{
                  width: 20,
                  paddingTop: 6,
                }}
                src={option.data.icon}
                alt={option.data.label}
              />
            </div>
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Flex gap={15}>
        <img width="40px" height="40px" src={coin.icon} alt={coin.name} />
        <Typography.Title level={2}>{coin.name}</Typography.Title>
      </Flex>
      <Divider style={{ margin: "10px 0 24px" }} />

      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
            max: +coin.marketCap.toFixed(0),
          },
        ]}
      >
        <InputNumber onChange={handleAmountChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="datetime">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber
          placeholder="Enter coin amount"
          disabled
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
