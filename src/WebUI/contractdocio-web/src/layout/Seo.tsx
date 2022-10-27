import { Helmet } from 'react-helmet';

export default (): JSX.Element => {
  return (
    <Helmet>
      <title>Contract.IO</title>
      <meta name="description" content="App Description" />
      <meta name="theme-color" content="#008f68" />
    </Helmet>
  );
};
