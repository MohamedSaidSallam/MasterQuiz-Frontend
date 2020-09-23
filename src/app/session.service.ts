import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export class SocketNameSpace extends Socket {
  constructor(socketConfig: SocketIoConfig) {
    super(socketConfig);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  room: SocketNameSpace;

  constructor(private code: string) {
    this.room = new SocketNameSpace({
      url: `https://masterquiz-backend.herokuapp.com/session/${code}`,
    });
  }

  foo(): void {
    this.room.emit('answer', 'hi ana msg');
  }

  public sendMessage(message): void {
    this.room.emit('msg', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.room.on('msg', (message) => {
        observer.next(message);
      });
    });
  }
}