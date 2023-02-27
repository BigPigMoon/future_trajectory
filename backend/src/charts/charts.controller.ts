import { Controller, Get } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller('charts')
export class ChartsController {
  constructor(private chartsService: ChartsService) {}

  @Get('/rfsubject')
  getRFSubjectData() {
    return this.chartsService.getRFSubjectData();
  }

  @Get('/actions')
  getActionsData() {
    return this.chartsService.getActionsData();
  }

  @Get('/date')
  getStartedAtData() {
    return this.chartsService.getDateData();
  }

  @Get('/inreester')
  getInReesterData() {
    return this.chartsService.getInReesterData();
  }

  @Get('/sporttype')
  getSportTypeData() {
    return this.chartsService.getSportTypeData();
  }

  @Get('/sportcomplex')
  getSportComplexData() {
    return this.chartsService.getSportComplexData();
  }
}
