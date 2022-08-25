import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
const { ExpressPeerServer } = require('peer');

const logger = new Logger();
async function bootstrap() {
  const express = require('express');
  const expressApp = express();
  const server = require('http').Server(expressApp);
  const { ExpressPeerServer } = require('peer');
  const peerServer = ExpressPeerServer(server, {
    debug: true,
  });
  expressApp.use('/peerjs', peerServer);

  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const port = 3000;

  await app.listen(port, () => {
    logger.log(`server is running on port:${port}`);
  });
}
bootstrap();
