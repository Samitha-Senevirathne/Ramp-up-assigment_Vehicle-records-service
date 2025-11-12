import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle.reference.entity';

@ObjectType()
@Entity()
export class ServiceRecord {
  
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  vin: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  service_date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cost?: number;

 
  // @Field(() => Vehicle, { nullable: true })
  // vehicle?: Vehicle;
}