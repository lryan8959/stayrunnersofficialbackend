"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
function hashPassword(password) {
    const SALT_ROUNDS = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, SALT_ROUNDS);
}
exports.hashPassword = hashPassword;
function comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=bcrypt.js.map