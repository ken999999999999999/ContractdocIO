import { Layout } from '@/layout';
import { AuthProvider } from '@/auth';

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <></>
      </Layout>
    </AuthProvider>
  );
};

export default App;
