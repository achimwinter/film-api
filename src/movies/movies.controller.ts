import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MovieDto } from './dtos/movie.dto';
import { MoviesService } from './movies.service';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async findAllMovies(@Req() req: any): Promise<MovieDto[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  async findMovieById(@Param('id') id: string, @Res() res): Promise<MovieDto> {
    return await this.movieService.findOneById(id);
  }

  @Get(':id/image')
  async getMovieCover(@Param('id') id: string, @Res() res) {
    const movieDto = await this.movieService.findOneById(id);
    return res.sendFile(movieDto.cover, {root: './movie_covers'});
  }

  @Get(':title')
  async findMovieByTitle(@Param('title') title: string): Promise<MovieDto> {
    return await this.movieService.fineOneByTitle(title);
  }

  @Post()
  async createMovie(
    @Body() movieDto: MovieDto,
  ): Promise<MovieDto> {
    return await this.movieService.createMovie(movieDto);
  }

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: './movie_covers'
    })
  }))
  async uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    }

    this.movieService.addMovieCoverPath(id, file.filename);

    return response;
  }

  @Delete(':id')
  async deleteMovieById(@Param('id') id: string): Promise<MovieDto> {
    return await this.movieService.deleteMovie(id);
  }

  @Put(':id')
  async updateMovieByid(
    @Param('id') id: string,
    @Body() movieDto: MovieDto,
  ): Promise<MovieDto> {
    return await this.movieService.updateMovie(id, movieDto);
  }
}
