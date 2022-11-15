import { Helmet } from 'react-helmet';
import icon from '@/asset/icon.svg';

export default (): JSX.Element => {
  return (
    <Helmet>
      <title>Contract.IO</title>
      <meta name="description" content="App Description" />
      <meta name="theme-color" content="#008f68" />
      <link id="favicon" rel="icon" href={icon} type="image/svg" />
    </Helmet>
  );
};
