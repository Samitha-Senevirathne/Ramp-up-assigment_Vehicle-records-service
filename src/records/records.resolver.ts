import { Resolver, Query, Mutation, Args, ResolveReference,ResolveField,Parent } from '@nestjs/graphql';
import { RecordsService } from './records.service';
import { CreateServiceRecordDto } from './dto/create-record.input';
import { UpdateServiceRecordDto } from './dto/update-record.input';
import { ServiceRecord } from './entities/record.entity';
import { Vehicle } from './entities/vehicle.reference.entity';


@Resolver(() => ServiceRecord)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  // Create
  @Mutation(() => ServiceRecord)
  async createServiceRecord(
    @Args('input') input: CreateServiceRecordDto,): Promise<ServiceRecord> {
    return this.recordsService.create(input);
  }

  // Find all
  @Query(() => [ServiceRecord], { name: 'allRecords' })
  findAll(): Promise<ServiceRecord[]> {
    return this.recordsService.findAll();
  }

  // Find by VIN
  @Query(() => [ServiceRecord], { name: 'vinRecord' })
  findByVIN(@Args('vin') vin: string): Promise<ServiceRecord[]> {
    return this.recordsService.findByVIN(vin);
  }

  // Update
  @Mutation(() => ServiceRecord)
  updateRecord(
    @Args('updateRecordInput') updateRecord: UpdateServiceRecordDto,
  ): Promise<ServiceRecord> {
    return this.recordsService.update(updateRecord);
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteServiceRecord(@Args('id') id: string): Promise<boolean> {
    return this.recordsService.delete(id);
  }

  // Add this resolver for the vehicle field on ServiceRecord
    @ResolveField(() => Vehicle)
  vehicle(@Parent() record: ServiceRecord): { __typename: string; vin: string } {
    return { __typename: 'Vehicle', vin: record.vin };
  }

}
