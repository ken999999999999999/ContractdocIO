import { AuthProvider, AuthProviderProps } from 'react-oidc-context';

interface IAuthConfigProvider {
  children: JSX.Element;
}

const oidConfig: AuthProviderProps = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: window.location.origin + '/authentication/login-callback',
  metadataUrl: `${process.env.REACT_APP_AUTH_URL}/.well-known/openid-configuration`,
  scope: 'openid profile ContactdocIO.WebUIAPI',
  post_logout_redirect_uri: window.location.origin
};

export default ({ children }: IAuthConfigProvider): JSX.Element => {
  return <AuthProvider {...oidConfig}>{children}</AuthProvider>;
};
