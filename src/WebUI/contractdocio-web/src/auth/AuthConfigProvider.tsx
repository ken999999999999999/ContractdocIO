import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

interface IAuthConfigProvider {
  children: JSX.Element;
}

const oidConfig: AuthProviderProps = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: `${window.location.origin}/authentication/login-callback`,
  metadataUrl: `${process.env.REACT_APP_AUTH_URL}/.well-known/openid-configuration`,
  scope: 'openid profile ContractdocIO.WebUIAPI',
  post_logout_redirect_uri: `${window.location.origin}/authentication/logout-callback`,
  monitorSession: true
};

export default ({ children }: IAuthConfigProvider): JSX.Element => {
  const navigate = useNavigate();
  return (
    <AuthProvider
      {...oidConfig}
      onSigninCallback={(user) => {
        const state = user?.state as { returnUrl: string };
        navigate(state?.returnUrl ? state.returnUrl : '/', {
          replace: true
        });
      }}
    >
      {children}
    </AuthProvider>
  );
};
