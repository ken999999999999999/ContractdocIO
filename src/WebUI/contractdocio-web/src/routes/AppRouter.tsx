import routeList from './RouteList';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/layout';
export default (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              {routeList?.map(({ link, jsx }, index) => (
                <Route index={!index} path={link} key={link} element={jsx} />
              ))}
            </Routes>
          </Layout>
        }
      ></Route>
    </Routes>
  );
};
