//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

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

export interface ISignedContractsClient {

    create(command: CreateSignedContractCommand): Promise<number>;

    getWithPagination(isSentFromMySelf: boolean | undefined, isSigned: boolean | null | undefined, pageNumber: number | undefined, pageSize: number | undefined, orderBy: string | null | undefined, isOrderByAsc: boolean | undefined): Promise<PaginatedListOfSignedContractBriefDto>;

    update(id: number, command: UpdateSignedContractCommand): Promise<FileResponse>;

    get(id: number): Promise<SignedContractDto>;
}

export class SignedContractsClient extends AuthorizedApiBase implements ISignedContractsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    create(command: CreateSignedContractCommand): Promise<number> {
        let url_ = this.baseUrl + "/api/SignedContracts";
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

    getWithPagination(isSentFromMySelf: boolean | undefined, isSigned: boolean | null | undefined, pageNumber: number | undefined, pageSize: number | undefined, orderBy: string | null | undefined, isOrderByAsc: boolean | undefined): Promise<PaginatedListOfSignedContractBriefDto> {
        let url_ = this.baseUrl + "/api/SignedContracts?";
        if (isSentFromMySelf === null)
            throw new Error("The parameter 'isSentFromMySelf' cannot be null.");
        else if (isSentFromMySelf !== undefined)
            url_ += "IsSentFromMySelf=" + encodeURIComponent("" + isSentFromMySelf) + "&";
        if (isSigned !== undefined && isSigned !== null)
            url_ += "IsSigned=" + encodeURIComponent("" + isSigned) + "&";
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

    protected processGetWithPagination(response: Response): Promise<PaginatedListOfSignedContractBriefDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginatedListOfSignedContractBriefDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginatedListOfSignedContractBriefDto>(null as any);
    }

    update(id: number, command: UpdateSignedContractCommand): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/SignedContracts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processUpdate(_response);
        });
    }

    protected processUpdate(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    get(id: number): Promise<SignedContractDto> {
        let url_ = this.baseUrl + "/api/SignedContracts/{id}";
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

    protected processGet(response: Response): Promise<SignedContractDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as SignedContractDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<SignedContractDto>(null as any);
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
    content?: string;
    type?: string;
    title?: string;
    version?: number;
    options?: OptionDto[];
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

export interface CreateSignedContractCommand {
    contractId?: number;
    email?: string;
}

export interface UpdateSignedContractCommand {
    id?: number;
    signature?: string;
    checkOptionIds?: number[];
}

export interface SignedContractDto extends BaseAuditableEntityDto {
    contractOwnedByUser?: IOUserDto;
    checkOptions?: CheckOptionDto[];
    type?: string;
    title?: string;
    content?: string;
    receivedByEmail?: string;
    signature?: string | undefined;
    signed?: Date | undefined;
    sent?: Date;
}

export interface IOUserDto {
    email?: string;
}

export interface CheckOptionDto {
    id?: number;
    content?: string;
    isRequired?: boolean;
    order?: number;
    isChecked?: boolean;
}

export interface PaginatedListOfSignedContractBriefDto {
    items?: SignedContractBriefDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export interface SignedContractBriefDto extends BaseAuditableEntityDto {
    contractOwnedByUser?: IOUserDto;
    type?: string;
    title?: string;
    signed?: Date | undefined;
    sent?: Date;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
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