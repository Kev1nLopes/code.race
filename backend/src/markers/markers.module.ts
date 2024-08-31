import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersController } from './markers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marker])],
  controllers: [MarkersController],
  providers: [MarkersService],
})
export class MarkersModule {}
