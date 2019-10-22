import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Youtube } from './youtube.entity';
import { Repository } from 'typeorm';
import { google } from 'googleapis';
import { YoutubeReposiry } from './youtube.repository';
import { response } from 'express';
import { GetApiYtbDTO } from './getlistAPI.dto';
@Injectable()
export class YoutubeService {
    private youtubeV3;
    constructor(
        @InjectRepository(YoutubeReposiry)
        private readonly youtubeRepo: Repository<Youtube>,
    ) {
        this.youtubeV3 = google.youtube({
            version: 'v3',
            auth: 'AIzaSyB0VwxT5ttGJ6mYLgybthfM7ME9VBUDvoY',
        });
    }
    async filterAPI(filterDTO: GetApiYtbDTO): Promise<any> {
        const { search, limit } = filterDTO;

        const options = {
            part: 'snippet, statistics',
            maxResults: 10,
            chart : 'mostPopular',
            regionCode: 'VN',
        };
        // https://www.youtube.com/watch?videoId
        this.youtubeV3.videos.list(options, (err, response) => {
            if (err) {
                console.log(err);
            }

            const channels = response.data.items;
            // const inforYtb = [];
            const result = channels.map(channel => {
                const inforYtb = {};
                inforYtb['id'] = channel.id ? channel.id : '';
                inforYtb['title'] = channel.snippet.title ? channel.snippet.title : '';
                inforYtb['channelTitle'] = channel.snippet.channelTitle ? channel.snippet.channelTitle : '';
                inforYtb['likeCount'] = channel.statistics.likeCount ? channel.statistics.likeCount : '';
                inforYtb['viewCount'] = channel.statistics.viewCount ? channel.statistics.viewCount : '';
                inforYtb['dislikeCount'] = channel.statistics.dislikeCount ? channel.statistics.dislikeCount : '';
                inforYtb['commentCount'] = channel.statistics.commentCount ? channel.statistics.commentCount : '';
                return inforYtb;
            });
            console.log(result);
        });

    }
}
