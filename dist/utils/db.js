"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_paginate_1 = __importDefault(require("prisma-paginate"));
const prismaClientSingleton = () => {
    return new client_1.PrismaClient().$extends(prisma_paginate_1.default);
};
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
