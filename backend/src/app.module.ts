import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MapsModule } from './maps/maps.module';
import { ChartsModule } from './charts/charts.module';

@Module({
  imports: [PrismaModule, MapsModule, ChartsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
