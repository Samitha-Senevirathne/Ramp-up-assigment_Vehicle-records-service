import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceRecordDto } from './dto/create-record.input';
import { UpdateServiceRecordDto } from './dto/update-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRecord } from './entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(ServiceRecord)
    private readonly serviceRecordRepo: Repository<ServiceRecord>,
  ) {}

  async create(createRecordInput: CreateServiceRecordDto): Promise<ServiceRecord> {
    const newRecord = this.serviceRecordRepo.create(createRecordInput);
    return await this.serviceRecordRepo.save(newRecord);
  }

  // Find all services sorted by service date
  async findAll(): Promise<ServiceRecord[]> {
    return await this.serviceRecordRepo.find({
      order: { service_date: 'ASC' },
    });
  }

  //Find service by VIN
  async findByVIN(vin: string): Promise<ServiceRecord[]> {
    return await this.serviceRecordRepo.find({
      where: { vin },
      order: { service_date: 'ASC' },
    });
  }

  // Update the vehicle record
  async update(updateRecord: UpdateServiceRecordDto): Promise<ServiceRecord> {
    const existingRecord = await this.serviceRecordRepo.findOneBy({ id: updateRecord.id });

    if (!existingRecord) {
      throw new NotFoundException(`service record with ID ${updateRecord.id} not found`);
    }

    const updated = Object.assign(existingRecord, updateRecord);
    return await this.serviceRecordRepo.save(updated);
  }

  // Delete record
  async delete(id: string): Promise<boolean> {
    const result = await this.serviceRecordRepo.delete(id);
    return result.affected !== 0;
  }
}
