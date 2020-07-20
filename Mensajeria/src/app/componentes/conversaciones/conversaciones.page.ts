import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { ChatService } from '../../services';
import * as moment from 'moment';

@Component({
	selector: 'app-conversaciones',
	templateUrl: './conversaciones.page.html',
	styleUrls: ['./conversaciones.page.scss'],
})
export class ConversacionesPage implements OnInit {

	@ViewChild(IonContent) content:IonContent;
	messages: any = [];
	newMsg = '';
	usuario: any = {id: ''};
	websocketServer: any = new WebSocket("ws://localhost:8080/");

	constructor(
        private chatService: ChatService,
        private loadingController: LoadingController
    ) {
    }

	ngOnInit(): void {
		this.usuario = JSON.parse(localStorage.getItem('usuario'));
		this.listMensaje();
		this.websocket();
	}

	listMensaje(): void {
		const formData = new FormData();
		formData.append('idSala', localStorage['idSala']);
		this.chatService.listMensaje(formData).subscribe((resp: any) => {
			if (resp.data) {
				this.messages = resp.data;

				setTimeout(() => {
					this.content.scrollToBottom(200);
				}, 1000);
			}
			
			
		}, (error: any) => {
			console.log('Error al enviar el mensaje', error);
		});
	}

	sendMessage(): void {
		const formData = new FormData();
		formData.append('idUsuario', this.usuario.id);
		formData.append('idSala', localStorage['idSala']);
		formData.append('mensaje', this.newMsg);
		formData.append('fechaHora', moment().format('YYYY-MM-DD HH:mm:ss'));
		formData.append('url', null);

		this.chatService.sendMensaje(formData).subscribe((resp: any) => {
			this.newMsg = '';
			const data = {
					'type':'chat',
					'id': resp.data.id,
					'idUsuario': resp.data.idUsuario,
					'idSala': resp.data.idSala,
					'mensaje': resp.data.mensaje,
					'fecha_hora': resp.data.fecha_hora,
					'url': resp.data.url,
					'nombre': resp.data.nombre,
					'apellido': resp.data.apellido,
					'foto': resp.data.foto
			};
			this.websocketServer.send(JSON.stringify(data));
		}, (error: any) => {
			console.log('Error al enviar el mensaje', error);
		});

		setTimeout(() => {
			this.content.scrollToBottom(200);
		});
	}

	async presentLoading() {
        const loading = await this.loadingController.create({
            message: ''
        });
        return loading;
    }

    websocket() {
		this.websocketServer.onopen = (e) => {
			this.websocketServer.send(
				JSON.stringify({
					'type':'socket',
					'idContact': this.usuario.id
				})
			);
		};

		this.websocketServer.onerror = (e) => {
			// Errorhandling
		}


		this.websocketServer.onmessage = (e) => {
			var json = JSON.parse(e.data);
			switch(json.type) {
				case 'socket':
					console.log('connection', json);
				break;
				case 'chat':
					this.messages.push(json.message)
				break;
			}
		}

		this.websocketServer.onclose = (e) => {
			// Errorhandling
		}
    }

}
