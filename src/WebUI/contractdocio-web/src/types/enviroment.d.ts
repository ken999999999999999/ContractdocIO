/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    REACT_APP_BASEURL: string;
    REACT_APP_DATE_FORMAT: string;
    REACT_APP_DATETIME_FORMAT: string;
    REACT_APP_TIME_FORMAT: string;
    REACT_APP_AUTH_URL: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_CLIENT_SECRET: string;
    REACT_APP_VERSION: string;
  }
}
