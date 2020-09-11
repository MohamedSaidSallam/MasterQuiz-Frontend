import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export class SocketNameSpace extends Socket{
  constructor(socketConfig: SocketIoConfig){
    super(socketConfig);
  }
}

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  room: SocketNameSpace;

  constructor(private code : string) {
    const code = 'fsf' 
    this.room  = new SocketNameSpace({url: `http://localhost:3000/session/${code}` });
  }

  foo (){
    this.room.emit('answer', 'hi ana msg')
  }

  public sendMessage(message) {
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
