import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { GetApiYtbDTO } from './getlistAPI.dto';

@Controller('youtube')
export class YoutubeController {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _ytbService: YoutubeService) { }
    @Get()
    getYtbAPI(@Query(ValidationPipe) filterDTO: GetApiYtbDTO): Promise<any> {
        return this._ytbService.filterAPI(filterDTO);
    }
}
