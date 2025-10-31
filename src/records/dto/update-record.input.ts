import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateServiceRecordDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  vin?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  service_date?: Date;

  @Field(() => Float, { nullable: true })
  cost?: number;
}
