import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(data: any, searchText: any, modulo: any): any {

    if (!searchText) {
      return data;
    }

    if (!!data) {
      return data.filter((res) => {
        let datos: boolean;
        switch (modulo) {
          case 'usuario':
            datos = this.getCleanedString(`${res.nombre} ${res.apellido}`).toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            break;
          default: return false;
        }
        return datos;
      });
    }
  }
  getCleanedString(cadena) {
    // Lo queremos devolver limpio en minusculas
    cadena = cadena.toLowerCase();

    // Quitamos acentos y 'ñ'. Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi, 'a');
    cadena = cadena.replace(/é/gi, 'e');
    cadena = cadena.replace(/í/gi, 'i');
    cadena = cadena.replace(/ó/gi, 'o');
    cadena = cadena.replace(/ú/gi, 'u');
    cadena = cadena.replace(/ñ/gi, 'n');
    return cadena;
  }
}
