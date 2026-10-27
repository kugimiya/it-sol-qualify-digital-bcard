import { PrismaClient } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';
import { PET_PROJECTS } from './pet-projects.seed-data';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.$transaction([
    prisma.project.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.profileLink.deleteMany(),
    prisma.profile.deleteMany(),
  ]);

  const PROFILE_ID = uuidv7();

  await prisma.profile.create({
    data: {
      id: PROFILE_ID,
      name: 'Гончаров Андрей Игоревич',
      description:
        'Senior React Frontend & Fullstack-разработчик. В вебе с 2017 года; последние годы — внутренние продукты для строительства и передачи объектов. Строю системы в TypeScript-монорепо (React, NestJS, Nx, GraphQL, Kafka): от UI и микрофронтендов до доменной модели, миграций и интеграций с 1С и ERP. Отдельный фокус — AI-assisted разработка: пайплайн «тикет → MR» в Cursor с MCP к внутренним системам.',
      links: {
        create: [
          { label: 'Портфолио', url: 'https://kugi.club/' },
          { label: 'Telegram', url: 'https://t.me/kugichka' },
          { label: 'Setka', url: 'https://set.ki/account/fDvVqFi' },
        ],
      },
      skills: {
        create: [
          { name: 'TypeScript' },
          { name: 'JavaScript' },
          { name: 'React' },
          { name: 'Next.js' },
          { name: 'NestJS' },
          { name: 'Node.js' },
          { name: 'GraphQL' },
          { name: 'Prisma' },
          { name: 'PostgreSQL' },
          { name: 'TypeORM' },
          { name: 'Docker' },
          { name: 'Git' },
          { name: 'Apache Kafka' },
          { name: 'RabbitMQ' },
          { name: 'Redux Toolkit' },
          { name: 'MobX' },
          { name: 'Nx' },
          { name: 'Material UI' },
          { name: 'Ant Design' },
          { name: 'Linux' },
          { name: 'GitLab CI' },
        ],
      },
      experiences: {
        create: [
          {
            company: 'Брусника',
            position: 'Senior FullStack Developer',
            startDate: new Date('2023-12-01'),
            endDate: null,
            achievements: [
              'Настроил AI-assisted пайплайн «тикет → MR» в Cursor: MCP к трекеру, GitLab, PostgreSQL, Confluence, Sentry, Grafana; reopen из тестинга ~5%, на pre-merge закрыто 40+ багов и >20 уязвимостей',
              'Сервис осмотра и приёмки помещений: фронт с нуля, UI-Kit, bulk-edit; монорепо на Nx, сборка ~4→~1 мин, бандл −30%',
              'Личный кабинет подрядчика: каркас Nx-монорепо, Kafka consumers в scheduler (задержка <1 с), тяжёлые страницы ~3 с→~800 мс',
              'ГИС инженерных сетей: интеграция ЭДО и SSO/ACL; geojson/network ~1.5 с→~500 мс; SQL-агрегации ~2–3 с→~300 мс',
              'Единый хост ИСУП: встраивание микрофронтов (host-component, react-ibridge); CI/build ~5→~1 мин',
            ],
          },
          {
            company: 'IRLIX (ООО Ирликс)',
            position: 'Senior FullStack Developer',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            achievements: [
              'Backoffice МТС Строки: каталог, загрузки контента, отчёты, промо, платежи (React, TypeScript, MobX, Turborepo)',
              'sitemap-generator для каталога Строк: Node.js, TypeScript, mssql, GitLab CI',
              'assessment — система оценки сотрудников: Next.js, Prisma, MySQL, Keycloak, Docker',
              'Провёл внутренний курс по Node.js; собеседования и менторство',
            ],
          },
          {
            company: 'Mish Design',
            position: 'Senior Frontend Developer / Senior React Developer',
            startDate: new Date('2021-02-01'),
            endDate: new Date('2023-02-28'),
            achievements: [
              'Protect My Application (Leroy Merlin): ведущий разработчик, BIA-формы ~60→~25 мин, типизированный API-слой',
              'Маркетплейс ТЦ «Зеленопарк»: p95 поиска ~5 с→~100 мс; расширение API CS-Cart под Next.js-витрину',
              'skidka.ru: LCP ~12 с→~6 с, вес страницы ~15 МБ→~2 МБ; вёл фронтенд и ревью PR',
              'Конструктор лендингов для Яндекса (Strapi + Next.js): новый лендинг ~3 спринта→~1',
              'Менторил 3 джунов; тимлид на части проектов',
            ],
          },
          {
            company: 'Норд Клан',
            position: 'Middle Frontend Developer / Middle React Developer',
            startDate: new Date('2020-06-01'),
            endDate: new Date('2021-02-28'),
            achievements: [
              'Humans PPS / Storefront / Delivery / KYC — основной или соавтор фронтенда (React, TypeScript, MobX, MUI)',
              'Manhattan Realty: карта Mapbox, фильтры, карусель объектов',
              'Peoplebase: fullstack (NestJS, GraphQL, PostgreSQL + React); Nordclan Track — точечные правки',
            ],
          },
          {
            company: 'Цифровые и Аналоговые Системы',
            position: 'Middle Frontend Developer / Middle React Developer',
            startDate: new Date('2019-08-01'),
            endDate: new Date('2020-06-30'),
            achievements: [
              'Миграция интерфейса клиники с Twig/jQuery на React: расписание, планы лечения, рентген, список клиентов',
              'Webpack, ESLint, Drone CI; документация API в MkDocs',
            ],
          },
          {
            company: 'Симбирские технологии, ООО',
            position: 'Junior FullStack Developer',
            startDate: new Date('2017-09-01'),
            endDate: new Date('2019-08-31'),
            achievements: [
              'Frontend в архитектуре коробочного решения: поддержка и интеграция нового функционала',
            ],
          },
          {
            company: 'IHOL',
            position: 'Верстальщик',
            startDate: new Date('2017-05-01'),
            endDate: new Date('2017-08-31'),
            achievements: [
              'Вёрстка макетов на аутсорсе',
            ],
          },
        ],
      },
      projects: {
        create: PET_PROJECTS.map((project) => ({
          name: project.name,
          url: project.url,
        })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
