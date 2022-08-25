import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
const { v4: uuidv4 } = require('uuid');
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  generateId(@Res() res: Response) {
    res.redirect(`/${uuidv4()}`);
  }

  @Get(':room')
  renderPage(@Res() res: Response, @Req() req: Request) {
    res.render('room', { roomId: req.params.room });
  }
}
