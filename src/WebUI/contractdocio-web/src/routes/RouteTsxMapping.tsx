import IndexPage from '@/pages/index';

interface IRouteTsxMapping {
  [key: string]: JSX.Element;
}

const RouteTsxMapping: IRouteTsxMapping = {
  '/': <IndexPage />
};

export default RouteTsxMapping;
