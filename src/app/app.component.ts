import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular7-live-stocks';

  constructor(private _socketService: SocketService) {
    this._socketService.initSocket();
    this._socketService.onMessage().subscribe((data) => {
      console.log('data', data);
    });
  }
}
