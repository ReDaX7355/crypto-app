import { Layout } from 'antd';
import AppHeader from './components/loyaut/AppHeader';
import AppSider from './components/loyaut/AppSider';
import AppContent from './components/loyaut/AppContent';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCrypto } from './context/cryptoSlice';
import { AppDispatch, RootState } from './context/store';
import Loader from './components/UI/Loader';
import { loadAssets } from './context/assetsSlice';

const App = () => {
  const { crypto, assets } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(loadCrypto());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAssets());
  }, [dispatch]);

  if (assets.loading == 'pending' && crypto.loading == 'pending')
    return <Loader sizeSpinner={50} />;

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default App;
