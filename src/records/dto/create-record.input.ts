import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateServiceRecordDto {
  @Field()
  vin: string;

  @Field()
  description: string;

  @Field()
  service_date: Date;

  @Field(() => Float, { nullable: true })
  cost?: number;
}

