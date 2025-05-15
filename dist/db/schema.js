"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').unique().primaryKey().defaultRandom(),
    email: (0, pg_core_1.varchar)('email').notNull().unique(),
    firstName: (0, pg_core_1.varchar)('first_name').notNull(),
    lastName: (0, pg_core_1.varchar)('last_name').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
});
//# sourceMappingURL=schema.js.map