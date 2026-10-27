import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.profileRepository.findSingletonProfile();
    if (!profile) {
      throw new NotFoundException(
        'Profile not found. Check database seed configuration.',
      );
    }
    return profile;
  }
}
