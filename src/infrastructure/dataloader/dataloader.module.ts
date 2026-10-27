import { Module } from '@nestjs/common';
import { ProfileModule } from '../../modules/profile/profile.module';
import { DataLoaderFactory } from './dataloader.factory';
import { GraphqlContextFactory } from './graphql-context.factory';

@Module({
  imports: [ProfileModule],
  providers: [DataLoaderFactory, GraphqlContextFactory],
  exports: [DataLoaderFactory, GraphqlContextFactory],
})
export class DataLoaderModule {}
