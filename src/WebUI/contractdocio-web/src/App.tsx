import { Layout } from '@/layout';
import { ReactNode } from 'react';

const App = ({ children }: { children: ReactNode }): JSX.Element => {
  return <Layout>{children}</Layout>;
};

export default App;
