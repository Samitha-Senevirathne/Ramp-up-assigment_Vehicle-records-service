// // import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

// // @ObjectType()
// // @Directive('@extends')
// // @Directive('@key(fields: "vin")')
// // export class Vehicle {
// //   @Field()
// //   @Directive('@external')
// //   vin: string;

// //   // We can add other fields we need from Vehicle service
// //   @Field({ nullable: true })
// //   @Directive('@external')
// //   car_make?: string;

// //   @Field({ nullable: true })
// //   @Directive('@external')
// //   car_model?: string;
// // }

// import { Directive, Field, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "vin")')
// export class Vehicle {
//   @Field()
//   @Directive('@external')
//   vin: string;
// }

// import { Directive, Field, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "vin")')
// export class Vehicle {
//   @Field()
//   @Directive('@external')
//   vin: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   first_name?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   last_name?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   car_make?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   car_model?: string;
// }

// import { Directive, Field, ObjectType } from '@nestjs/graphql';
// import { ServiceRecord } from './record.entity';

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "vin")')
// export class Vehicle {
//   @Field()
//   @Directive('@external')
//   vin: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   first_name?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   last_name?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   car_make?: string;

//   @Field({ nullable: true })
//   @Directive('@external')
//   car_model?: string;

//   // Add this field - service records for this vehicle
//   @Field(() => [ServiceRecord], { nullable: true })
//   serviceRecords?: ServiceRecord[];
// }

import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { ServiceRecord } from './record.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "vin")')
export class Vehicle {
  @Field()
  @Directive('@external')
  vin: string;

  // Remove the @external fields and let the Vehicle service resolve them
  // Just add the serviceRecords field that we're extending
  @Field(() => [ServiceRecord], { nullable: true })
  serviceRecords?: ServiceRecord[];
}