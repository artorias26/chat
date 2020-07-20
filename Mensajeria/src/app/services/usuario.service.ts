import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    url = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getSelect(id) {
        return this.http.get(`${this.url}/api/usuario.php?op=select&id=${id}`);
    }

    update(id, data) {
        return this.http.post(`${this.url}/api/usuario.php?op=update&id=${id}`, data);
    }

    photoProfile(data) {
        return this.http.post(`${this.url}/api/usuario.php?op=photo`, data);
    }

    remove(id) {
        return this.http.get(`${this.url}/api/usuario.php?op=delete&id=${id}`);
    }
}