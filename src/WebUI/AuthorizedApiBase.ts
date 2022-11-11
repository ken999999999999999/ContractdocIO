export class AuthorizedApiBase {
    protected constructor() { }

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        const tokenJSON = sessionStorage.getItem(
            `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`
        );

        const result = tokenJSON ? JSON.parse(tokenJSON) : null;

        const token = result?.access_token ?? '';

        options.headers = {
            ...options.headers,
            Authorization: 'bearer ' + token
        };

        return Promise.resolve(options);
    };
}