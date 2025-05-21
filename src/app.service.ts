import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './db/schema';
import { users } from './db/schema';
import { desc, eq } from 'drizzle-orm';
import { QueryLogger } from './db/Logger';

type UserInsert = typeof users.$inferInsert;

export type UserCreate = Pick<UserInsert, 'firstName' | 'lastName' | 'email'>;
export type UserUpdate = UserCreate & { id: string };
@Injectable()
export class AppService implements OnModuleInit {
  private db!: NodePgDatabase<typeof schema>;

  async onModuleInit() {
    this.db = drizzle({
      connection: {
        connectionString: process.env.DATABASE_URL!,
      },
      schema,
      logger: new QueryLogger(),
    });
  }

  async getUser(userId: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, userId),
      // columns
    });

    if (user) {
      return user;
    }

    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  async getUsers(page?: number, size?: number) {
    const q = this.db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt), desc(users.id));

    if (page && size) {
      return q
        .$dynamic()
        .limit(size)
        .offset((page - 1) * size);
    }

    return q;
  }

  async createUser(userData: typeof users.$inferInsert) {
    const result = await this.db
      .insert(users)
      .values({
        ...userData,
      })
      .returning({ id: users.id });

    return result.at(0)?.id;
  }

  async updateUser({ id, firstName, lastName, email }: UserUpdate) {
    const result = await this.db
      .update(users)
      .set({
        firstName,
        lastName,
        email,
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      });

    return result.at(0);
  }

  async deleteUser(userId: string) {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, userId))
      .returning({ id: users.id });

    return result.at(0)?.id;
  }
}
