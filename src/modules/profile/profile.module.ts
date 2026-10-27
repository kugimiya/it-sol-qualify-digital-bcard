import { Module } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './graphql/profile.resolver';

@Module({
  providers: [ProfileRepository, ProfileService, ProfileResolver],
  exports: [ProfileRepository],
})
export class ProfileModule {}
