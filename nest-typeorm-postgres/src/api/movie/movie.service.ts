import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

interface SortOptions {
  sortKey: string;
  sort: string;
}

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  public async getAllMovie(
    paginationOptions: IPaginationOptions,
    sortOptions?: SortOptions,
    name?: string,
  ): Promise<Pagination<Movie>> {
    const isSort = sortOptions?.sortKey ? true : false;
    const orderOptions: any = {};
    if (isSort) {
      orderOptions[sortOptions.sortKey] = sortOptions.sort;
    }

    const isName = name ? true : false;

    const queryOptions = {
      where: {
        isDeleted: false,
        ...(isName && { name: ILike(`%${name}%`) }),
      },
      ...(isSort && { order: orderOptions }),
    };
    console.log('In Get ALL Movies', queryOptions);
    return paginate<Movie>(this.repository, paginationOptions, queryOptions);
  }

  public async getMovie(id: number): Promise<Movie> {
    const movie = this.repository.findOne(id);
    if (movie === undefined) {
      throw new NotFoundException('No Movie Found');
    }
    return movie;
  }

  public async createMovie(body: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.name = body.name;
    movie.director = body.director;
    movie.actor = body.actor;
    return this.repository.save(movie);
  }
}
