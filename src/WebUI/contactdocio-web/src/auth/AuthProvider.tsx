import {
  AuthProvider as ReactAuthProvider,
  AuthProviderProps,
} from "react-oidc-context";

interface IAuthProvider {
  children: JSX.Element;
}

const oidConfig: AuthProviderProps = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: window.location.origin + "/authentication/login-callback",
  metadataUrl: `${process.env.REACT_APP_AUTH_URL}/.well-known/openid-configuration`,
  post_logout_redirect_uri: window.location.origin,
};

const AuthProvider = ({ children }: IAuthProvider): JSX.Element => {
  return <ReactAuthProvider {...oidConfig}>{children}</ReactAuthProvider>;
};

export default AuthProvider;
