"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const SignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const response = yield prisma.user.create({
            data: {
                email, name, password: hashedPassword
            }
        });
        if (response) {
            return res.json({ message: 'succes' }).status(201);
        }
    }
    catch (error) {
        return res.json({ message: 'error creating account' }).status(500);
    }
});
exports.SignUpController = SignUpController;
