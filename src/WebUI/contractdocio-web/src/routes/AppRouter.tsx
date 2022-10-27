import routeList from './RouteList';
import { Routes, Route } from 'react-router-dom';
import App from '@/App';

export default (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <App>
            <Routes>
              {routeList?.map(({ link, jsx }, index) => (
                <Route index={!index} path={link} key={link} element={jsx} />
              ))}
            </Routes>
          </App>
        }
      ></Route>
    </Routes>
  );
};
