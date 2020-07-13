import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    url = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    registrarChat(params) {
        return this.http.post(`${this.url}/api/chat.php?op=add`, params);
    }

}