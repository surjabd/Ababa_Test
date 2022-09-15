import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('movie')
export class MovieController {
  @Inject(MovieService)
  private readonly service: MovieService;

  @Get('')
  @ApiQuery({ name: 'sortKey', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  public getAllMovie(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sortKey') sortKey?: string,
    @Query('sort') sort?: string,
    @Query('name') name?: string,
  ): Promise<Pagination<Movie>> {
    return this.service.getAllMovie(
      {
        page,
        limit,
        route: 'http://localhost:3000/movie',
      },
      { sortKey: sortKey, sort: sort },
      name,
    );
  }

  @Get('/:id?')
  public getMovie(@Query('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.service.getMovie(id);
  }
  @Post()
  public createMovie(@Body() body: CreateMovieDto): Promise<Movie> {
    return this.service.createMovie(body);
  }
}
