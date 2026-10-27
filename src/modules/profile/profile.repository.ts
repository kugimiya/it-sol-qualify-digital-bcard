import { Injectable } from '@nestjs/common';
import {
  Experience,
  Profile,
  ProfileLink,
  Project,
  Skill,
} from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSingletonProfile(): Promise<Profile | null> {
    return this.prisma.profile.findFirst();
  }

  async findSkillsByProfileIds(
    profileIds: string[],
  ): Promise<Map<string, Skill[]>> {
    if (profileIds.length === 0) {
      return new Map();
    }
    const rows = await this.prisma.skill.findMany({
      where: { profileId: { in: profileIds } },
      orderBy: { id: 'asc' },
    });
    return groupByProfileId(rows);
  }

  async findExperiencesByProfileIds(
    profileIds: string[],
  ): Promise<Map<string, Experience[]>> {
    if (profileIds.length === 0) {
      return new Map();
    }
    const rows = await this.prisma.experience.findMany({
      where: { profileId: { in: profileIds } },
      orderBy: { startDate: 'desc' },
    });
    return groupByProfileId(rows);
  }

  async findProjectsByProfileIds(
    profileIds: string[],
  ): Promise<Map<string, Project[]>> {
    if (profileIds.length === 0) {
      return new Map();
    }
    const rows = await this.prisma.project.findMany({
      where: { profileId: { in: profileIds } },
      orderBy: { id: 'asc' },
    });
    return groupByProfileId(rows);
  }

  async findLinksByProfileIds(
    profileIds: string[],
  ): Promise<Map<string, ProfileLink[]>> {
    if (profileIds.length === 0) {
      return new Map();
    }
    const rows = await this.prisma.profileLink.findMany({
      where: { profileId: { in: profileIds } },
      orderBy: { id: 'asc' },
    });
    return groupByProfileId(rows);
  }
}

function groupByProfileId<T extends { profileId: string }>(
  rows: T[],
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const list = map.get(row.profileId);
    if (list) {
      list.push(row);
    } else {
      map.set(row.profileId, [row]);
    }
  }
  return map;
}
