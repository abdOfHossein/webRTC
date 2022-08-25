import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoChatModule } from './video-chat/video-chat.module';

@Module({
  imports: [VideoChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
