import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';
import { VehicleResolver } from './vehicle.resolver'; 
import { ServiceRecord } from './entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRecord])],
  providers: [RecordsResolver, RecordsService,VehicleResolver],
  exports: [RecordsService]
})
export class RecordsModule {}