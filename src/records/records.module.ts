// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RecordsService } from './records.service';
// import { RecordsResolver } from './records.resolver';
// import { ServiceRecord } from './entities/record.entity';

// @Module({
//     imports: [TypeOrmModule.forFeature([ServiceRecord])],
//   providers: [RecordsResolver, RecordsService],
//   exports:[RecordsService]
// })
// export class RecordsModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';
import { VehicleResolver } from './vehicle.resolver'; // Add this
import { ServiceRecord } from './entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRecord])],
  providers: [RecordsResolver, RecordsService,VehicleResolver], // Add VehicleResolver
  exports: [RecordsService]
})
export class RecordsModule {}