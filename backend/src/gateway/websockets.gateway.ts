import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JWTUtil } from 'utils/jwt-util';

@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private clients: Set<Socket> = new Set();
  private secretKey  = ''

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    const token = client.handshake.headers['authorization']?.split(' ')[1];

    if(!token){
      client.disconnect();
      return;
    }

    try{
      JWTUtil.verifyToken(token)
      console.log(`Client connected: ${client.id}`);
      this.clients.add(client);
      
    }catch(error){
      console.log('Invalid Token', error)
      client.disconnect()
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }


  handleMessage(payload: any): void {
    this.server.emit('notification', payload);
  }

}