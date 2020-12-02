import * as Axios from 'axios';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { HttpMethod } from '../enums';

const axios = Axios.default;

export class HttpRequest {
    private requestUrl!: string;
    private requestMethod!: HttpMethod;
    private requestData!: any;
    private requestParams!: any;

    execute(): Observable<Axios.AxiosResponse> {
        const request = axios({
            method: this.requestMethod,
            url: this.requestUrl,
            data: this.requestData,
            params: this.requestParams,
        });

        return from(request).pipe(take(1));
    }

    data(data: any): this {
        this.requestData = data;

        return this;
    }

    parameters(parameters: any): this {
        this.requestParams = parameters;

        return this;
    }

    method(method: HttpMethod): this {
        this.requestMethod = method;

        return this;
    }

    endpoint(url: string): this {
        this.requestUrl = url;

        return this;
    }
}
