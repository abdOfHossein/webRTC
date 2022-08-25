import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoChatDto } from './create-video-chat.dto';

export class UpdateVideoChatDto extends PartialType(CreateVideoChatDto) {
  id: number;
}
