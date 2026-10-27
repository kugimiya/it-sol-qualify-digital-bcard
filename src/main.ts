import { NestFactory } from '@nestjs/core';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import { AppModule } from './app.module';

async function waitForDatabase(maxAttempts = 30): Promise<void> {
  const client = new PrismaClient();
  try {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await client.$queryRaw`SELECT 1`;
        return;
      } catch {
        if (attempt === maxAttempts) {
          throw new Error('Database is not reachable');
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  } finally {
    await client.$disconnect();
  }
}

function prepareDatabase(): void {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  if (process.env.NODE_ENV === 'production') {
    execSync('node prisma/compiled/seed.js', { stdio: 'inherit' });
  } else {
    execSync('npx prisma db seed', { stdio: 'inherit' });
  }
}

async function bootstrap(): Promise<void> {
  await waitForDatabase();
  prepareDatabase();

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`GraphQL (Apollo Sandbox): http://localhost:${port}/graphql`);
}

bootstrap();
