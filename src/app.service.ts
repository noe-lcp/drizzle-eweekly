import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './db/schema';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

type UserInsert = typeof users.$inferInsert;

export type UserCreate = Pick<UserInsert, 'firstName' | 'lastName' | 'email'>;
@Injectable()
export class AppService implements OnModuleInit {
  private db!: NodePgDatabase<typeof schema>;

  onModuleInit() {
    this.db = drizzle(process.env.DATABASE_URL!);
  }

  getUser(userId: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });
  }

  createUser(userData: typeof users.$inferInsert) {
    return this.db.insert(users).values({
      ...userData,
    });
  }

  updateUser(userData: typeof users.$inferInsert) {
    return this.db.insert(users).values({
      ...userData,
    });
  }

  deleteUser(userId: string) {
    return this.db.delete(users).where(eq(users.id, userId));
  }

  // test(): string {
  //   return this.db.query.users
  // }
}
