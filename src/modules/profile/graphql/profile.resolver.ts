import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from '../profile.service';
import {
  ExperienceModel,
  ProfileLinkModel,
  ProfileModel,
  ProjectModel,
  SkillModel,
} from './profile.model';
import {
  toExperienceModel,
  toLinkModel,
  toProfileModel,
  toProjectModel,
  toSkillModel,
} from './profile.mapper';
import { GraphqlContext } from '../../../infrastructure/dataloader/graphql-context.factory';
import { DATALOADERS } from '../../../infrastructure/dataloader/dataloader.types';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    description: 'Профиль специалиста (единственная визитка)',
  })
  async profile(): Promise<ProfileModel> {
    const profile = await this.profileService.getProfile();
    return toProfileModel(profile);
  }

  @ResolveField(() => [ProfileLinkModel])
  async links(
    @Parent() profile: ProfileModel,
    @Context() ctx: GraphqlContext,
  ): Promise<ProfileLinkModel[]> {
    const rows = await ctx[DATALOADERS].linksByProfileId.load(profile.id);
    return rows.map(toLinkModel);
  }

  @ResolveField(() => [SkillModel])
  async skills(
    @Parent() profile: ProfileModel,
    @Context() ctx: GraphqlContext,
  ): Promise<SkillModel[]> {
    const rows = await ctx[DATALOADERS].skillsByProfileId.load(profile.id);
    return rows.map(toSkillModel);
  }

  @ResolveField(() => [ExperienceModel])
  async experience(
    @Parent() profile: ProfileModel,
    @Context() ctx: GraphqlContext,
  ): Promise<ExperienceModel[]> {
    const rows = await ctx[DATALOADERS].experiencesByProfileId.load(profile.id);
    return rows.map(toExperienceModel);
  }

  @ResolveField(() => [ProjectModel])
  async projects(
    @Parent() profile: ProfileModel,
    @Context() ctx: GraphqlContext,
  ): Promise<ProjectModel[]> {
    const rows = await ctx[DATALOADERS].projectsByProfileId.load(profile.id);
    return rows.map(toProjectModel);
  }
}
