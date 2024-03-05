import {
  Card,
  Flex,
  Layout,
  List,
  Skeleton,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import { FC } from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { deleteAsset } from '../../context/assetsSlice';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
  width: '100%',
};

const skeletonStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '40px 20px',
  borderRadius: 10,
};

const AppSider: FC = () => {
  const { assets } = useSelector((state: RootState) => ({
    assets: state.assets,
  }));

  console.log(assets);

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteAsset(id));
  };

  if (assets.data.length < 1) {
    return (
      <Layout.Sider width="350px" style={siderStyle} className="sider">
        <Typography.Title
          level={2}
          style={{ color: '#fff', textAlign: 'center' }}
        >
          Not assets yet
        </Typography.Title>
        ;
      </Layout.Sider>
    );
  }

  if (assets.loading === 'pending') {
    return (
      <Layout.Sider width="350px" style={siderStyle} className="sider">
        <Flex vertical gap={20} style={{ height: '100%' }}>
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
          <Skeleton active style={skeletonStyle} />
        </Flex>
      </Layout.Sider>
    );
  }

  return (
    <Layout.Sider width="350px" style={siderStyle} className="sider">
      <Flex
        vertical
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 100px)',
          padding: '0 1rem 0 0',
        }}
      >
        {assets.data.map((asset, id) => (
          <Card key={id} style={{ marginBottom: '1rem' }}>
            <Flex align="start" justify="space-between">
              <Statistic
                title={asset.name}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              ></Statistic>
              <CloseOutlined
                className="close_button"
                onClick={() => handleDelete(asset.id)}
              />
            </Flex>

            <List
              size="small"
              dataSource={[
                {
                  title: 'Total Profit',
                  value: asset.totalProfit,
                  suffix: '$',
                  withtag: true,
                },
                {
                  title: 'Amount',
                  value: asset.amount,
                  suffix: '',
                  isPlane: true,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.withtag && (
                        <Tag color={asset.grow ? 'green' : 'red'}>
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
      </Flex>
    </Layout.Sider>
  );
};

export default AppSider;
