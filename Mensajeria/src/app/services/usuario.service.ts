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
}