import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { toMovieDto } from 'shared/mapper';
import { AppDataSource } from 'src/app.datasource';
import { Repository } from 'typeorm';
import { MovieDto } from './dtos/movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  constructor() {
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOneById(id: string): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  async fineOneByTitle(title: string): Promise<Movie> {
    return this.movieRepository.findOneBy({ title });
  }

  async createMovie(movieDto: MovieDto): Promise<MovieDto> {
    const { title, stars, votes, release, cover } = movieDto;

    const movie: Movie = await this.movieRepository.create({
      title: title,
      stars: stars,
      votes: votes,
      release: release,
      cover: cover,
    });

    await this.movieRepository.save(movie);

    return toMovieDto(movie);
  }

  async updateMovie(oldMovieId: string, movieDto: MovieDto): Promise<MovieDto> {
    const { title, stars, votes, release, cover } = movieDto;

    let movie: Movie = await this.movieRepository.findOneBy({ id: oldMovieId });

    if (!movie) {
      throw new HttpException(`Movie doesnt exist`, HttpStatus.BAD_REQUEST);
    }

    movieDto = {
      id: oldMovieId,
      title,
      stars,
      votes,
      release,
      cover,
    };

    await this.movieRepository.update({ id: oldMovieId }, movieDto);

    movie = await this.movieRepository.findOneBy({ id: oldMovieId });
    return toMovieDto(movie);
  }

  async deleteMovie(id: string): Promise<MovieDto> {
    const movie: Movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new HttpException(`Movie not found`, HttpStatus.BAD_REQUEST);
    }

    await this.movieRepository.delete({ id });

    return toMovieDto(movie);
  }

  async addMovieCoverPath(id: string, filePath: string): Promise<MovieDto> {
    const movie: Movie = await this.movieRepository.findOneBy({id});

    if (!movie) {
      throw new HttpException(`Movie not found`, HttpStatus.BAD_REQUEST);
    }

    movie.cover = filePath;
    
    await this.movieRepository.update({id}, movie);

    return toMovieDto(await this.movieRepository.findOneBy({id}))
  }
}
