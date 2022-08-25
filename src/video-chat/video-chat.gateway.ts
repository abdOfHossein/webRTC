import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { VideoChatService } from './video-chat.service';
import { CreateVideoChatDto } from './dto/create-video-chat.dto';
import { UpdateVideoChatDto } from './dto/update-video-chat.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoChatGateway {
  constructor(private readonly videoChatService: VideoChatService) {}
  @WebSocketServer()
  server: Server;

  // socket.on("join-room", (roomId, userId, userName) => {
  //   socket.join(roomId);
  //   socket.to(roomId).broadcast.emit("user-connected", userId);
  //   socket.on("message", (message) => {
  //     io.to(roomId).emit("createMessage", message, userName);
  //   });
  // });
  @SubscribeMessage('join-room')
  create(
    @MessageBody() createVideoChatDto: CreateVideoChatDto,
    socket: Socket,
  ) {
    this.server.on('connection', (socket) => {
      socket.on('join-room', (roomId, userId, userName) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
        socket.on('message', (message) => {
          this.server.to(roomId).emit('createMessage', message, userName);
        });
      });
    });
    return;
  }

  @SubscribeMessage('findAllVideoChat')
  findAll() {
    return this.videoChatService.findAll();
  }

  @SubscribeMessage('findOneVideoChat')
  findOne(@MessageBody() id: number) {
    return this.videoChatService.findOne(id);
  }

  @SubscribeMessage('updateVideoChat')
  update(@MessageBody() updateVideoChatDto: UpdateVideoChatDto) {
    return this.videoChatService.update(
      updateVideoChatDto.id,
      updateVideoChatDto,
    );
  }

  @SubscribeMessage('removeVideoChat')
  remove(@MessageBody() id: number) {
    return this.videoChatService.remove(id);
  }
}
