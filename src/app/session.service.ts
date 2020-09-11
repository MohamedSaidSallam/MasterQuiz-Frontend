import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

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

  constructor(private socket: Socket) {
    const code = 'fsf' 
    this.room  = new SocketNameSpace({url: 'http://localhost:3000',options: { path: `/${code}` }  });
  }

  foo (){
    this.room.emit('answer', 'hi ana msg')
  }
}
