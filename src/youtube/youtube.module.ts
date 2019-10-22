import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeReposiry } from './youtube.repository';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeReposiry])],
  providers: [YoutubeService],
  controllers: [YoutubeController],
})
export class YoutubeModule { }
