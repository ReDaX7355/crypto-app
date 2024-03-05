import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => {
        if (a.name < b.name) {
          return -1;
        } else {
          return 1;
        }
      },
      multiple: 3,
    },
    showSorterTooltip: false,
    defaultSortOrder: "descend",
  },
  {
    title: "Price $",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 1,
    },
  },
];

const AssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);

  const data: DataType[] = assets.data.map((item, i) => {
    return {
      key: i,
      name: item.name,
      price: item.price,
      amount: item.amount,
    };
  });
  return (
    <Table
      style={{ flex: 1 }}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 250 }}
    />
  );
};

export default AssetsTable;
