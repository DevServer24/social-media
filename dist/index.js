"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const sign_up_controllers_1 = require("./controllers/sign-up.controllers");
dotenv_1.default.config();
const server = (0, express_1.default)();
const port = process.env.PORT || 4000;
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use((0, helmet_1.default)());
server.get('/', () => {
});
server.post('/sign-up', sign_up_controllers_1.SignUpController);
server.listen(port, () => {
    console.log(`Server Connected to localhost:${port}`);
});
