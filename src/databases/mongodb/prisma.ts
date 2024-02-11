import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { JsonArray } from "type-fest";

export default class Prisma {
    static _instance: Prisma;
    #prisma;
    constructor() {
        this.#prisma = new PrismaClient();
        if (!Prisma._instance) {
            Prisma._instance = this;
            this.createIndexTTL("EmailVerifyToken", "createdAt", { createdAt: 1 }, 0.5 * 3600)
                .then((result) => {})
                .catch((err) => {
                    throw err;
                });
            this.createIndexTTL("PasswordResetToken", "createdAt", { createdAt: 1 }, 0.5 * 3600)
                .then((result) => {})
                .catch((err) => {
                    throw err;
                });
        }
        return Prisma._instance;
    }

    getInstance() {
        return Prisma._instance;
    }

    getPrisma() {
        return this.#prisma;
    }

    async createIndexTTL(tableName: string, fieldName: string, key: {}, expireAfterSeconds: number) {
        try {
            const result = await this.#prisma.$transaction(async (p) => {
                const indexName = `${fieldName}_ttl_index`;
                if (!(await this.isCollectionExist(tableName))) {
                    await this.#prisma.$runCommandRaw({
                        create: tableName,
                    });
                }
                if (await this.isIndexExist(tableName, indexName)) {
                    const dropResult = await this.#prisma.$runCommandRaw({
                        dropIndexes: tableName,
                        index: indexName,
                    });
                }
                const createResult = await this.#prisma.$runCommandRaw({
                    createIndexes: tableName,
                    indexes: [
                        {
                            key: key,
                            name: indexName,
                            expireAfterSeconds: expireAfterSeconds,
                        },
                    ],
                });
            });
            return result;
        } catch (err) {
            throw err;
        }
    }
    async isIndexExist(tableName: string, indexName: string) {
        try {
            const listResult = await this.#prisma.$runCommandRaw({
                listIndexes: tableName,
            });
            return _.find(_.get(listResult, ["cursor", "firstBatch"]), { name: indexName });
        } catch (err) {
            throw err;
        }
    }
    async isCollectionExist(tableName: string) {
        try {
            const listResult = await this.#prisma.$runCommandRaw({
                listCollections: tableName,
            });
            return _.find(_.get(listResult, ["cursor", "firstBatch"]), { name: tableName });
        } catch (err) {
            throw err;
        }
    }
}

const prisma = new Prisma().getPrisma();
export { prisma };
