import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MapsService } from './maps.service';
import { Coordinate } from './types';

@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) {}

  @Get('/all')
  getAllObject(): Promise<Coordinate[]> {
    return this.mapsService.getAllObject();
  }

  @Get('/:id')
  getInfo(@Param('id', ParseIntPipe) id: number) {
    return this.mapsService.getInfo(id);
  }
}
