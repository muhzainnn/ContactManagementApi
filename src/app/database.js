import { PrismaClient } from '@prisma/client';
import { logger } from './logging.js';

// Inisialisasi Prisma Client dengan pengaturan log.
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "warn"
        },
    ]
});

// Menangani event "error" Prisma Client dan mencatat ke log.
prismaClient.$on("error", (error) => {
    logger.error(error);
});

// Menangani event "info" Prisma Client dan mencatat ke log.
prismaClient.$on("info", (info) => {
    logger.info(info);
});

// Menangani event "query" Prisma Client dan mencatat ke log.
prismaClient.$on("query", (query) => {
    logger.info(query);
});

// Menangani event "warn" Prisma Client dan mencatat ke log.
prismaClient.$on("warn", (warn) => {
    logger.warn(warn);
});
