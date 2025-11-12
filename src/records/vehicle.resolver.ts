import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Vehicle } from '../records/entities/vehicle.reference.entity';
import { ServiceRecord } from '../records/entities/record.entity';
import { RecordsService } from './records.service';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@Resolver(() => Vehicle)
export class VehicleResolver {
  private readonly logger = new Logger(VehicleResolver.name);

  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => [ServiceRecord])   //fetch data for service records for vin
  async serviceRecords(@Parent() vehicle: Vehicle): Promise<ServiceRecord[]> {
    try {
      this.logger.debug(`Fetching service records for VIN: ${vehicle.vin}`);
      const records = await this.recordsService.findByVIN(vehicle.vin);

      if (!records || records.length === 0) {
        this.logger.warn(`No service records found for VIN: ${vehicle.vin}`);
      } else {
        this.logger.log(
          `Successfully fetched ${records.length} service record(s) for VIN: ${vehicle.vin}`,
        );
      }

      return records;
    } catch (error) {
      this.logger.error(
        `Error fetching service records for VIN: ${vehicle.vin}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch service records for VIN: ${vehicle.vin}`,
      );
    }
  }
}
  