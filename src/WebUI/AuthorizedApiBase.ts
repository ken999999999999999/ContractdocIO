export class AuthorizedApiBase {
    private readonly token: string;

    protected constructor() {
        const tokenJSON = sessionStorage.getItem(
            `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`);

        const result = tokenJSON ? JSON.parse(tokenJSON) : null;

        this.token = result?.access_token ?? "";
    }

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        const token = this.token;

        options.headers = {
            ...options.headers,
            Authorization: 'bearer ' + token
        };

        return Promise.resolve(options);
    };
}