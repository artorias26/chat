import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../services/global';
import * as introJs from '../../../assets/js/intro.js';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    constructor(
        private router: Router,
        private global: Global
    ) { }

    ngOnInit() {
        this.textGuia();
    }

    textGuia(option = introJs()) {
        const isHome = this.global.getLocalStorage('isHome');
        if (isHome) {
            return;
        }
        option.setOptions({
            nextLabel: 'Siguiente',
            prevLabel: 'Atras',
            skipLabel: 'Salir',
            doneLabel: 'Finalizar',
            steps: [{
                element: '#tab-button-chat',
                intro: 'Aquí se visualizaran los contactos de la empresa que ya están registrados',
                position: 'top'
            }, {
                element: '#tab-button-reciente',
                intro: 'Aquí se muestran la lista más recientes de conversaciones',
                position: 'top'
            },{
                element: '#tab-button-perfil',
                intro: 'Aquí podras actualizar tus datos personales',
                position: 'top'
            }]
        });
        setTimeout(() => {
            if (this.router.url == '/inicio/chat') {
                const setting = option.start();
                setting._options.skipTooltipButton.addEventListener('click', () => {
                    // this.global.setLocalStorage('isHome', true);
                }, false);
            }
        }, 1500);
    }

}
