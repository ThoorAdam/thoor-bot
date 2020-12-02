import { HttpRequest } from '../models/';
import { HttpMethod } from '../enums';

export class HttpService {
    get(url: string) {
        return new HttpRequest().endpoint(url).method(HttpMethod.Get);
    }
}
