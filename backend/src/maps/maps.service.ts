import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coordinate } from './types';
import { OjbectInfo } from './types/objectInfo.type';

@Injectable()
export class MapsService {
  constructor(private prisma: PrismaService) {}

  async getAllObject(): Promise<Coordinate[]> {
    return await this.prisma.sportObject.findMany({
      select: {
        Id: true,
        YaCoordX: true,
        YaCoordY: true,
        Name: true,
      },
    });
  }

  async getInfo(id: number): Promise<OjbectInfo> {
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
        Email: true,
        URL: true,
        WorkInMOFR: true,
        WorkInSat: true,
        WorkInSun: true,
        Area: true,
        SportComplexType: { select: { Title: true } },
      },
    });

    return {
      Name: ret.Name,
      NameEng: ret.NameEng,
      Active: ret.Active_SportObject_ActiveIdToActive.Name,
      ShortDescription: ret.ShortDescription,
      ShortDescriptionEng: ret.ShortDescriptionEng,
      Description: ret.Description,
      DescriptionEng: ret.DescriptionEng,
      Address: ret.Address,
      AddressEng: ret.AddressEng,
      ObjectPhone: ret.ObjectPhone,
      Email: ret.Email,
      URL: ret.URL,
      WorkInMOFR: ret.WorkInMOFR,
      WorkInSat: ret.WorkInSat,
      WorkInSun: ret.WorkInSun,
      Area: ret.Area,
      SportComplexType: ret.SportComplexType.Title,
    };
  }
}
