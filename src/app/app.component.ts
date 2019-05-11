import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular7-live-stocks';
  socketUrl = 'ws://stocks.mnet.website';
  ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(this.socketUrl);
    this.ws.onmessage = function (evt) {
      let received_msg = evt.data;
      console.log("Message is received...", received_msg);
    };
  }
}
