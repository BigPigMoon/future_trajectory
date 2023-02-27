import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MapsModule } from './maps/maps.module';
import { ChartsModule } from './charts/charts.module';

@Module({
  imports: [PrismaModule, MapsModule, ChartsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
