import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';


//Hay que implementar este OnModuleInit para inicializar el servidor WebSocket
@WebSocketGateway()
export class ChatGateway implements OnModuleInit{

//Importante este decorador para que lo tome como servidor WebSocket
  @ WebSocketServer()
  public server: Server;
  
  constructor(private readonly chatService: ChatService) {}


  onModuleInit() {
    this.server.on('connection', (socket:Socket) => {
      const { token, name } = socket.handshake.auth;
      console.log({token, name});
      if(!name){
        socket.disconnect();
        return;
      }

      socket.on('disconnect', () => {
        // console.log('Cliente desconectado: ', socket.id);
      });
     
} );
  }
}

