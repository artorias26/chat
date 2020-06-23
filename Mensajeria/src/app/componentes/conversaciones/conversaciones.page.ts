import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.page.html',
  styleUrls: ['./conversaciones.page.scss'],
})
export class ConversacionesPage implements OnInit {

  messages= [
    {
      user: 'jesus',
    createdAt:1554090856000,
    msg:'hey que tal estas?'
    },
    {
      user: 'ricardo',
    createdAt:1554090856000,
    msg:'hey que tal estas tu?'
    },
    {
      user: 'jesus',
    createdAt:1554090856000,
    msg:'Mensaje de prueba'
    }
  ];

  currentUser = 'jesus'
  newMsg='';

  @ViewChild(IonContent) content:IonContent;
  constructor(){

  }
  ngOnInit(): void {
   
  }

  sendMessage(){
    this.messages.push({
      user:'jesus',
      createdAt: new Date().getTime(),
      msg:this.newMsg
    });

    this.newMsg='';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });

  
  }

}
