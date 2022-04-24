import { Movie } from 'src/movies/entities/movie.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'movie',
  password: 'password123',
  database: 'movie_db',
  synchronize: true,
  logging: true,
  entities: [Movie],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource has been initialized');
  })
  .catch((error) => console.log(error));
