"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hamburguerReturnSchema = exports.hamburguerCreateSchema = exports.hamburguerSchema = void 0;
const zod_1 = require("zod");
exports.hamburguerSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().positive(),
    ingredients: zod_1.z.array(zod_1.z.string()).nonempty(),
    size: zod_1.z.string().min(1),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.hamburguerCreateSchema = exports.hamburguerSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.hamburguerReturnSchema = exports.hamburguerSchema.omit({
    createdAt: true,
    updatedAt: true,
});
