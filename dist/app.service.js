"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("./db/schema");
const schema_1 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let AppService = class AppService {
    db;
    onModuleInit() {
        this.db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
    }
    getUser(userId) {
        return this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.id, userId),
        });
    }
    createUser(userData) {
        return this.db.insert(schema_1.users).values({
            ...userData,
        });
    }
    updateUser(userData) {
        return this.db.insert(schema_1.users).values({
            ...userData,
        });
    }
    deleteUser(userId) {
        return this.db.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map