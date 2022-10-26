import { useAuth } from 'react-oidc-context';
interface IAuthProvider {
  children: JSX.Element;
}

export default ({ children }: IAuthProvider): JSX.Element => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  if (!auth.isAuthenticated)
    auth.signinRedirect({
      state: { returnUrl: encodeURIComponent(window.location.pathname) }
    });

  return children;
};
