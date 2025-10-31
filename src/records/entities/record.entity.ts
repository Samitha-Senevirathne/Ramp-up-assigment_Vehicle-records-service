// import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


// @ObjectType()
// @Entity()
// export class ServiceRecord {
//   @Field((type)=>ID)
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Field()
//   @Column()
//   vin: string; // link to Vehicle

//   @Field()
//   @Column()
//   description: string;

//   @Field()
//   @Column()
//   service_date: Date;

//   @Field()
//   @Column({ nullable: true })
//   cost?: number;
// }

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
  vin: string; // link to Vehicle

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  service_date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cost?: number;

  // THIS LINE IS CRITICAL - make sure it's here
  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;
}