import { MovieDto } from "src/movies/dtos/movie.dto";
import { Movie } from "src/movies/entities/movie.entity";

export const toMovieDto = (data: Movie): MovieDto => {
    const { id, title, release, votes, stars, cover } = data;

    let movieDto: MovieDto = {
        id,
        title,
        stars,
        votes,
        release,
        cover,
    };

    return movieDto;
}