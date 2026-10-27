import { Injectable } from '@nestjs/common';
import { DataLoaderFactory } from './dataloader.factory';
import { DATALOADERS, IDataLoaders } from './dataloader.types';

export interface GraphqlContext {
  [DATALOADERS]: IDataLoaders;
}

@Injectable()
export class GraphqlContextFactory {
  constructor(private readonly dataLoaderFactory: DataLoaderFactory) {}

  create(): GraphqlContext {
    return {
      [DATALOADERS]: this.dataLoaderFactory.createLoaders(),
    };
  }
}
