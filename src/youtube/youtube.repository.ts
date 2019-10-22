import { EntityRepository, Repository } from 'typeorm';
import { Youtube } from './youtube.entity';

@EntityRepository(Youtube)
export class YoutubeReposiry extends Repository<Youtube> { }
