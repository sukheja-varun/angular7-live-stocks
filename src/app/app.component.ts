import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { Stock } from './stock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  upArrow: string = '../assets/images/up-arrow.png';
  downArrow: string = '../assets/images/down-arrow.png';
  stocksMap = new Map<string, Stock>();

  constructor(private _socketService: SocketService) {
  }

  /**
   * @description initializes socket connection and call onMessage
   * to start getting messages from web socket
   */
  ngOnInit(): void {
    this._socketService.initSocket();
    this._socketService.onMessage()
      .subscribe((data: Array<[string, number]>) => {
        this.updateStocksMap(data);
      });
  }

  /**
   * @description it stores web socket data into map
   * If an entry is already present in Map then it updates it
   * else inserts a new entry into Map
   * @param wsData : array of stocks data received from web socket
   */
  updateStocksMap(wsData: Array<[string, number]>) {
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
        let newElement = { name: name, price: price, diff: 0, updatedAt: new Date() };
        this.stocksMap.set(name, newElement);
      }
    });
  }
}
