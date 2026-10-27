import DataLoader from 'dataloader';
import {
  Experience,
  ProfileLink,
  Project,
  Skill,
} from '@prisma/client';

export interface IDataLoaders {
  skillsByProfileId: DataLoader<string, Skill[]>;
  experiencesByProfileId: DataLoader<string, Experience[]>;
  projectsByProfileId: DataLoader<string, Project[]>;
  linksByProfileId: DataLoader<string, ProfileLink[]>;
}

export const DATALOADERS = Symbol('DATALOADERS');
