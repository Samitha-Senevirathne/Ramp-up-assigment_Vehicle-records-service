import { Injectable, NotFoundException ,Logger,InternalServerErrorException } from '@nestjs/common';
import { CreateServiceRecordDto } from './dto/create-record.input';
import { UpdateServiceRecordDto } from './dto/update-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRecord } from './entities/record.entity';
import { Vehicle } from './entities/vehicle.reference.entity';

@Injectable()
export class RecordsService {

    private logger = new Logger('RecordsService');

  constructor(
    @InjectRepository(ServiceRecord)
    private readonly serviceRecordRepo: Repository<ServiceRecord>,
  ) {}

  async create(createRecordInput: CreateServiceRecordDto): Promise<ServiceRecord> {
    const newRecord = this.serviceRecordRepo.create(createRecordInput);
    return await this.serviceRecordRepo.save(newRecord);
  }

  // // Find all services sorted by service date
  // async findAll(): Promise<ServiceRecord[]> {
    
  //   return await this.serviceRecordRepo.find({
  //     order: { service_date: 'ASC' },
  //   });
  // }



  async findAll(): Promise<ServiceRecord[]> {
    try {
      this.logger.log('Fetching all service records...');

      const records = await this.serviceRecordRepo.find({
        order: { service_date: 'ASC' },
      });

      if (!records || records.length === 0) {
        this.logger.warn('No service records found.');
        throw new NotFoundException('No service records found.');
      }

      this.logger.log(`Fetched ${records.length} service record(s).`);
      return records;
    } catch (error) {
      this.logger.error(`Error fetching all service records - ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch service records.');
    }
  }




  //Find service by VIN
  // async findByVIN(vin: string): Promise<ServiceRecord[]> {
  //   return await this.serviceRecordRepo.find({
  //     where: { vin },
  //     order: { service_date: 'ASC' },
  //   });
  // }



  async findByVIN(vin: string): Promise<ServiceRecord[]> {
    try {
      this.logger.log(`Fetching service records for VIN: ${vin}`);

      const records = await this.serviceRecordRepo.find({
        where: { vin },
        order: { service_date: 'ASC' },
      });

      if (!records || records.length === 0) {
        this.logger.warn(`No service records found for VIN: ${vin}`);
        throw new NotFoundException(`No service records found for VIN: ${vin}`);
      }

      this.logger.log(`Found ${records.length} service record(s) for VIN: ${vin}`);
      return records;
    } catch (error) {
      this.logger.error(`Error fetching service records for VIN: ${vin} - ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to fetch service records for VIN: ${vin}`,
      );
    }

  }

  // Update the vehicle record
  // async update(updateRecord: UpdateServiceRecordDto): Promise<ServiceRecord> {
  //   const existingRecord = await this.serviceRecordRepo.findOneBy({ id: updateRecord.id });

  //   if (!existingRecord) {
  //     throw new NotFoundException(`service record with ID ${updateRecord.id} not found`);
  //   }

  //   const updated = Object.assign(existingRecord, updateRecord);
  //   return await this.serviceRecordRepo.save(updated);
  // }


// Update service record
async update(updateRecord: UpdateServiceRecordDto): Promise<ServiceRecord> {
  try {
    const existingRecord = await this.serviceRecordRepo.findOneBy({ id: updateRecord.id });

    if (!existingRecord) {
      this.logger.warn(`Service record not found: ${updateRecord.id}`);
      throw new Error(`Service record not found`);
    }

    await this.serviceRecordRepo.update(updateRecord.id, updateRecord);
    const updatedRecord = await this.serviceRecordRepo.findOneBy({ id: updateRecord.id });

    if (!updatedRecord) {
      this.logger.warn(`Service record retrieval failed after update: ${updateRecord.id}`);
      throw new Error('Service record retrieval failed');
    }

    this.logger.log(`Service record updated: ${updateRecord.id}`);
    return updatedRecord;
  } catch (error) {
    this.logger.error(`Error updating service record: ${error.message}`);
    throw error;
  }
}


  
  // Delete vehicle
  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.serviceRecordRepo.delete(id);
      if (result.affected && result.affected > 0) {
        this.logger.log(`Vehicle record deleted: ${id}`);
        return true;
      } else {
        this.logger.warn(`Vehicle record not found for deletion: ${id}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Error deleting vehicle: ${error.message}`);
      throw error;
    }
  }
}
