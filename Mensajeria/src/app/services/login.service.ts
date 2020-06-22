import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    url = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    login(params) {
        return this.http.post(`${this.url}/api/login.php?op=login`, params);
    }

    recuperar(params) {
        return this.http.post(`${this.url}/api/login.php?op=recovery`, params);
    }

    registrar(params) {
        return this.http.post(`${this.url}/api/login.php?op=register`, params);
    }
    

}