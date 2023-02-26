import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coordinate } from './types';

@Injectable()
export class MapsService {
  constructor(private prisma: PrismaService) {}

  async getAllObject(): Promise<Coordinate[]> {
    const coordinate = await this.prisma.sportObject.findMany({
      select: {
        Id: true,
        YaCoordX: true,
        YaCoordY: true,
        YaCenterX: true,
        YaCenterY: true,
        MiniCoordX: true,
        MiniCoordY: true,
      },
    });

    const ret: Coordinate[] = coordinate.map((value) => {
      return { Id: value.Id, YaMapX: value.YaCoordX, YaMapY: value.YaCoordY };
    });

    return ret;
  }

  async getInfo(id: number) {
    const ret = await this.prisma.sportObject.findFirst({
      where: { Id: id },
      select: {
        Name: true,
        NameEng: true,
        Active_SportObject_ActiveIdToActive: { select: { Name: true } },
        ShortDescription: true,
        ShortDescriptionEng: true,
        Description: true,
        DescriptionEng: true,
        Address: true,
        AddressEng: true,
        ObjectPhone: true,
        WorkInMOFR: true,
        WorkInSat: true,
        WorkInSun: true,
        Email: true,
        URL: true,
      },
    });

    return ret;
  }
}
