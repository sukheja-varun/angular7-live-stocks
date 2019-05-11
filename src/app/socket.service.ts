import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private ws: WebSocket;
  private readonly SOCKET_URL = 'ws://stocks.mnet.website';
  private subject = new Subject<any>();

  constructor() { }

  /**
   * @description initialises a connection to the websocket
   * Also when connection is closed it resets the ws variable
   */
  initSocket(): void {
    this.ws = new WebSocket(this.SOCKET_URL);
    this.ws.onclose = (evt) => this.ws = null;
  }

  /**
   * @description it listens to the messages sent by web socket
   * and sends it to the observer
   */
  onMessage() {
    if (!this.ws) {
      this.initSocket();
    }

    this.ws.onmessage = (evt) => this.subject.next(JSON.parse(evt.data));
    return this.subject.asObservable();
  }

  /**
   * @description it closes the web socket connection
   */
  close() {
    this.ws.close();
  }
}
