import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { ServiceRecord } from './record.entity';

@ObjectType()
@Directive('@extends') //extends Vehicle type from Vehicle service
@Directive('@key(fields: "vin")')
export class Vehicle {
  @Field()
  @Directive('@external')
  vin: string;

  @Field(() => [ServiceRecord], { nullable: true })   //adding this new feild to vVehicle
  serviceRecords?: ServiceRecord[]; 
}