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

  @Get('/started')
  getStartedAtData() {
    return this.chartsService.getStartedAtData();
  }

  @Get('/ended')
  getEndedAtData() {
    return this.chartsService.getEndedAtData();
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
