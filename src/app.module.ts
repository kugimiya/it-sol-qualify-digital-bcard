import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import {
  DataLoaderModule,
} from './infrastructure/dataloader/dataloader.module';
import { GraphqlContextFactory } from './infrastructure/dataloader/graphql-context.factory';

@Module({
  imports: [
    PrismaModule,
    DataLoaderModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [GraphqlContextFactory],
      useFactory: (graphqlContextFactory: GraphqlContextFactory) => ({
        autoSchemaFile: join(__dirname, 'schema.gql'),
        sortSchema: true,
        introspection: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: (): ReturnType<GraphqlContextFactory['create']> =>
          graphqlContextFactory.create(),
      }),
    }),
    ProfileModule,
  ],
})
export class AppModule {}
