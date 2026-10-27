import { Experience, Profile, ProfileLink, Project, Skill } from '@prisma/client';
import {
  ExperienceModel,
  ProfileLinkModel,
  ProfileModel,
  ProjectModel,
  SkillModel,
} from './profile.model';

export function toProfileModel(profile: Profile): ProfileModel {
  return {
    id: profile.id,
    name: profile.name,
    description: profile.description,
    links: [],
    skills: [],
    experience: [],
    projects: [],
  };
}

export function toLinkModel(link: ProfileLink): ProfileLinkModel {
  return { id: link.id, label: link.label, url: link.url };
}

export function toSkillModel(skill: Skill): SkillModel {
  return { id: skill.id, name: skill.name };
}

export function toExperienceModel(experience: Experience): ExperienceModel {
  return {
    id: experience.id,
    company: experience.company,
    position: experience.position,
    period: formatPeriod(experience.startDate, experience.endDate),
    achievements: experience.achievements,
  };
}

export function toProjectModel(project: Project): ProjectModel {
  return { id: project.id, name: project.name, url: project.url };
}

function formatPeriod(start: Date, end: Date | null): string {
  const startLabel = formatMonthYear(start);
  const endLabel = end ? formatMonthYear(end) : 'настоящее время';
  return `${startLabel} — ${endLabel}`;
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
}
