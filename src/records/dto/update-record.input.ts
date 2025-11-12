import { Field, InputType, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateServiceRecordDto {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
   @IsNotEmpty()

  vin?: string;

  @Field({ nullable: true })
  @IsNotEmpty()

  description?: string;

  @Field({ nullable: true })
  @IsNotEmpty()

  service_date?: Date;

  @Field(() => Float, { nullable: true })
  @IsNotEmpty()

  cost?: number;
}
