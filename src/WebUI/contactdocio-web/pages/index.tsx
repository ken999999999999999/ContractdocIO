import type { NextPage } from 'next';
import { signOut, signIn, useSession } from 'next-auth/react';

const Home: NextPage = (): JSX.Element => {
  const { data: session } = useSession();
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;

  return (
    <>
      Signed in {session} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default Home;
