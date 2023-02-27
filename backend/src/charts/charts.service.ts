import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChartData } from './types';

@Injectable()
export class ChartsService {
  constructor(private prismaService: PrismaService) {}

  async getRFSubjectData(): Promise<ChartData> {
    const rfSubject = await this.prismaService.rFSubject.findMany();
    const objects = await this.prismaService.sportObject.findMany({
      select: { RFSubjectID: true },
    });

    const dataset: number[] = rfSubject.map(() => 0);

    objects.forEach((val) => {
      dataset[val.RFSubjectID - 1]++;
    });

    return {
      type: 'bar',
      labels: rfSubject.map((val) => val.Title),
      datasets: [
        { label: 'Количество комплексов в субъектах РФ', data: dataset },
      ],
    };
  }

  async getActionsData(): Promise<ChartData> {
    const actions = await this.prismaService.actionsWithObject.findMany();
    const objects = await this.prismaService.sportObject.findMany({
      select: { ActionsWithObjectId: true },
    });

    const dataset: number[] = actions.map(() => 0);

    objects.forEach((val) => {
      dataset[val.ActionsWithObjectId - 1]++;
    });

    return {
      type: 'doughnut',
      labels: actions.map((val) => val.Title),
      datasets: [{ label: 'Количество объектов', data: dataset }],
    };
  }

  getStartedAtData() {}

  getEndedAtData() {}

  async getInReesterData(): Promise<ChartData> {
    const actions = await this.prismaService.active.findMany();
    const objects = await this.prismaService.sportObject.findMany({
      select: { InReesterId: true },
    });

    const dataset: number[] = actions.map(() => 0);

    objects.forEach((val) => {
      dataset[val.InReesterId - 1]++;
    });

    return {
      type: 'doughnut',
      labels: actions.map((val) => val.Name),
      datasets: [{ label: 'Количество объектов в реесте', data: dataset }],
    };
  }

  async getSportTypeData(): Promise<ChartData> {
    const rfSubject = await this.prismaService.sportType.findMany();
    const objects = await this.prismaService.sportObject.findMany({
      select: { ObjectSportType: { select: { SportTypeId: true } } },
    });

    const dataset: number[] = rfSubject.map(() => 0);

    objects.forEach((val) => {
      val.ObjectSportType.forEach((e) => {
        dataset[e.SportTypeId - 1]++;
      });
    });

    return {
      type: 'bar',
      labels: rfSubject.map((val) => val.Title),
      datasets: [
        { label: 'Количество объектов с типом спорта', data: dataset },
      ],
    };
  }

  async getSportComplexData(): Promise<ChartData> {
    const rfSubject = await this.prismaService.sportComplexType.findMany();
    const objects = await this.prismaService.sportObject.findMany({
      select: { SportComplexTypeId: true },
    });

    const dataset: number[] = rfSubject.map(() => 0);

    objects.forEach((val) => {
      dataset[val.SportComplexTypeId - 1]++;
    });

    return {
      type: 'bar',
      labels: rfSubject.map((val) => val.Title),
      datasets: [{ label: 'Количество объектов с типом', data: dataset }],
    };
  }
}
