"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBody = void 0;
const zod_1 = require("zod");
class ValidateBody {
    static execute(schema) {
        return (req, res, next) => {
            try {
                req.body = schema.parse(req.body);
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({ errors: error.issues });
                }
                next(error);
            }
        };
    }
}
exports.ValidateBody = ValidateBody;
