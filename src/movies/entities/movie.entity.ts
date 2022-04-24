import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: true })
  title: string;
  @Column()
  release: Date;
  @Column()
  votes: number;
  @Column()
  stars: number;
  @Column()
  cover: string;
}
