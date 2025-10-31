import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Vehicle } from '../records/entities/vehicle.reference.entity';
import { ServiceRecord } from '../records/entities/record.entity';
import { RecordsService } from './records.service';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => [ServiceRecord])
  async serviceRecords(@Parent() vehicle: Vehicle): Promise<ServiceRecord[]> {
    return this.recordsService.findByVIN(vehicle.vin);
  }
}