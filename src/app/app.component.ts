import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular7-live-stocks';
  stocksMap = new Map();

  constructor(private _socketService: SocketService) {
  }

  ngOnInit(): void {
    this._socketService.initSocket();
    this._socketService.onMessage().subscribe((data) => {
      console.log('data', data);
      this.updateStocksMap(data);
    });
  }

  updateStocksMap(wsData: []) {
    wsData.forEach((element) => {
      let name = element[0];
      let price = element[1];
      let elementInMap = this.stocksMap.get(name);

      if (elementInMap) {
        elementInMap.diff = price - elementInMap.price;
        elementInMap.updatedAt = new Date();
        elementInMap.price = price;
        this.stocksMap.set(name, elementInMap);
      } else {
        this.stocksMap.set(name, { name: name, price: price, diff: 0, updatedAt: new Date() });
      }
    });

    console.log('map', this.stocksMap);
  }
}
