//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

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

export interface IContractsClient {

    create(command: CreateContractCommand): Promise<number>;

    getWithPagination(pageNumber: number | undefined, pageSize: number | undefined, orderBy: string | null | undefined, isOrderByAsc: boolean | undefined): Promise<PaginatedListOfContractBriefDto>;

    get(id: number): Promise<ContractDto>;
}

export class ContractsClient extends AuthorizedApiBase implements IContractsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    create(command: CreateContractCommand): Promise<number> {
        let url_ = this.baseUrl + "/api/Contracts";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCreate(_response);
        });
    }

    protected processCreate(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    getWithPagination(pageNumber: number | undefined, pageSize: number | undefined, orderBy: string | null | undefined, isOrderByAsc: boolean | undefined): Promise<PaginatedListOfContractBriefDto> {
        let url_ = this.baseUrl + "/api/Contracts?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (orderBy !== undefined && orderBy !== null)
            url_ += "OrderBy=" + encodeURIComponent("" + orderBy) + "&";
        if (isOrderByAsc === null)
            throw new Error("The parameter 'isOrderByAsc' cannot be null.");
        else if (isOrderByAsc !== undefined)
            url_ += "IsOrderByAsc=" + encodeURIComponent("" + isOrderByAsc) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processGetWithPagination(_response);
        });
    }

    protected processGetWithPagination(response: Response): Promise<PaginatedListOfContractBriefDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginatedListOfContractBriefDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginatedListOfContractBriefDto>(null as any);
    }

    get(id: number): Promise<ContractDto> {
        let url_ = this.baseUrl + "/api/Contracts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: Response): Promise<ContractDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ContractDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ContractDto>(null as any);
    }
}

export interface CreateContractCommand {
    parentContractId?: number | undefined;
    content?: string;
    type?: string;
    title?: string;
    options?: OptionInputDto[];
}

export interface OptionInputDto {
    content?: string;
    isRequired?: boolean;
    order?: number;
}

export interface BaseEntityDto {
    id?: number;
}

export interface BaseAuditableEntityDto extends BaseEntityDto {
    created?: Date;
    createdBy?: string | undefined;
    lastModified?: Date | undefined;
    lastModifiedBy?: string | undefined;
}

export interface ContractDto extends BaseAuditableEntityDto {
    options?: OptionDto[];
    content?: string;
    type?: string;
    title?: string;
    version?: number;
}

export interface OptionDto {
    content?: string;
    isRequired?: boolean;
    order?: number;
}

export interface PaginatedListOfContractBriefDto {
    items?: ContractBriefDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export interface ContractBriefDto extends BaseAuditableEntityDto {
    type?: string;
    title?: string;
    version?: number;
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}