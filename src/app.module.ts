// // import { Module } from '@nestjs/common';
// // import { AppService } from './app.service';
// // import { GraphQLModule } from '@nestjs/graphql';
// // import { ApolloDriver, ApolloDriverConfig,ApolloFederationDriver,ApolloFederationDriverConfig } from '@nestjs/apollo';
// // import { join } from 'path';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { RecordsModule } from './records/records.module';

// // @Module({
// //   imports: [

   
// //     RecordsModule, GraphQLModule.forRoot<ApolloFederationDriverConfig>({
// //       driver: ApolloFederationDriver,
// //       autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
// //     }),

// //     TypeOrmModule.forRoot({
// //       type: 'postgres',
// //       host: 'localhost',
// //       port: 5432,
// //       username: 'postgres',
// //       password: 'Sam',
// //       database: 'vehicle_service_db',
// //       entities: [__dirname + '/**/*.entity{.ts,.js}'],
// //       synchronize: true,
// //     }),
// //   ],
// //   controllers: [],
// //   providers: [AppService],
// // })
// // export class AppModule {}


// import { Module } from '@nestjs/common';
// import { AppService } from './app.service';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RecordsModule } from './records/records.module';

// @Module({
//   imports: [
//     RecordsModule, 
//     GraphQLModule.forRoot<ApolloFederationDriverConfig>({
//       driver: ApolloFederationDriver,
//       autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
//       // Add this to use Federation 2
//       buildSchemaOptions: {
//         orphanedTypes: [], // we'll add our Vehicle reference here if needed
//       },
//     }),

//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'Sam',
//       database: 'vehicle_service_db',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//   ],
//   controllers: [],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { Vehicle } from './records/entities/vehicle.reference.entity';

@Module({
  imports: [
    RecordsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/graphql-schema.gql'),
      },
      buildSchemaOptions: {
        orphanedTypes: [Vehicle], // Important!
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sam',
      database: 'vehicle_service_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}