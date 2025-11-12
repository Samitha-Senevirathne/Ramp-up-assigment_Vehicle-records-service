import { Field, InputType, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateServiceRecordDto {
  @Field()
  @IsNotEmpty()
  vin: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
    @IsNotEmpty()
  service_date: Date;

  @Field(() => Float, { nullable: true })
  @IsNotEmpty()
  
  cost?: number;
}

