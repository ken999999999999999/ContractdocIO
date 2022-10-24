namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    BASEURL: string;
    DATE_FORMAT: string;
    DATETIME_FORMAT: string;
    TIME_FORMAT: string;
    IdentityServer4_Issuer: string;
    IdentityServer4_CLIENT_ID: string;
    IdentityServer4_CLIENT_SECRET: string;
  }
}
