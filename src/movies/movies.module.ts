import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.register({
        dest: './files',
    })],
})
export class MoviesModule {}
