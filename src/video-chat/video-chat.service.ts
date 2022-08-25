import { Injectable } from '@nestjs/common';
import { CreateVideoChatDto } from './dto/create-video-chat.dto';
import { UpdateVideoChatDto } from './dto/update-video-chat.dto';

@Injectable()
export class VideoChatService {
  create(createVideoChatDto: CreateVideoChatDto) {
    return 'This action adds a new videoChat';
  }

  findAll() {
    return `This action returns all videoChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoChat`;
  }

  update(id: number, updateVideoChatDto: UpdateVideoChatDto) {
    return `This action updates a #${id} videoChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoChat`;
  }
}
