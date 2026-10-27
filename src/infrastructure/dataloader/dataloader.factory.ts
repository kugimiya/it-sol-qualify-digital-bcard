import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ProfileRepository } from '../../modules/profile/profile.repository';
import { IDataLoaders } from './dataloader.types';

@Injectable()
export class DataLoaderFactory {
  constructor(private readonly profileRepository: ProfileRepository) {}

  createLoaders(): IDataLoaders {
    return {
      skillsByProfileId: new DataLoader(async (profileIds) => {
        const map = await this.profileRepository.findSkillsByProfileIds([
          ...profileIds,
        ]);
        return profileIds.map((id) => map.get(id) ?? []);
      }),
      experiencesByProfileId: new DataLoader(async (profileIds) => {
        const map = await this.profileRepository.findExperiencesByProfileIds([
          ...profileIds,
        ]);
        return profileIds.map((id) => map.get(id) ?? []);
      }),
      projectsByProfileId: new DataLoader(async (profileIds) => {
        const map = await this.profileRepository.findProjectsByProfileIds([
          ...profileIds,
        ]);
        return profileIds.map((id) => map.get(id) ?? []);
      }),
      linksByProfileId: new DataLoader(async (profileIds) => {
        const map = await this.profileRepository.findLinksByProfileIds([
          ...profileIds,
        ]);
        return profileIds.map((id) => map.get(id) ?? []);
      }),
    };
  }
}
