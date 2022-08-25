import { Module } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import { VideoChatGateway } from './video-chat.gateway';

@Module({
  providers: [VideoChatGateway, VideoChatService]
})
export class VideoChatModule {}
