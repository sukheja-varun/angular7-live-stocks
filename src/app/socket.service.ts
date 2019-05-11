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

  initSocket(): void {
    this.ws = new WebSocket(this.SOCKET_URL);
  }

  onMessage() {
    if (!this.ws) {
      this.initSocket();
    }

    this.ws.onmessage = (evt) => this.subject.next(evt.data);
    return this.subject.asObservable();
  }
}
