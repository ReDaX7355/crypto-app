import { Flex } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const stylePortfolio: React.CSSProperties = {
  margin: '1rem 0',
  width: '100%',
  maxHeight: '500px',
};

const PortfolioChart = () => {
  const assets = useSelector((state: RootState) => state.assets.data);

  const data = {
    labels: assets.map((item) => item.name),
    datasets: [
      {
        label: 'Price ($)',
        data: assets.map((item) => item.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex style={stylePortfolio} justify="center">
      <Pie data={data} />
    </Flex>
  );
};

export default PortfolioChart;
