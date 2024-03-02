import { Layout, Typography } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle: React.CSSProperties = {
  padding: '1rem',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
};

const AppContent: FC = () => {
  const { assets, crypto } = useSelector((state: RootState) => state);

  const cryptoPriceMap = crypto.data.reduce(
    (acc: { [key: string]: number }, coin) => {
      acc[coin.id] = coin.price;
      return acc;
    },
    {}
  );

  return (
    <Layout.Content style={contentStyle}>
      {assets.data.length != 0 && (
        <Typography.Title level={3} style={{ color: '#fff' }}>
          Portfolio:{' '}
          {assets.data
            .map((asset) => {
              return asset.amount * cryptoPriceMap[asset.id];
            })
            .reduce((acc, val) => (acc += val), 0)
            .toFixed(2)}
          $
        </Typography.Title>
      )}
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};

export default AppContent;
