import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileLinkModel {
  @Field(() => ID)
  id!: number;

  @Field()
  label!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class SkillModel {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;
}

@ObjectType()
export class ExperienceModel {
  @Field(() => ID)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field()
  period!: string;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class ProjectModel {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [ProfileLinkModel])
  links!: ProfileLinkModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel], { name: 'experience' })
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}
