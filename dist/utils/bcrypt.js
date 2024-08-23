"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
const bcrypt = require("bcrypt");
function hashPassword(password) {
    const SALT_ROUNDS = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, SALT_ROUNDS);
}
function comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
//# sourceMappingURL=bcrypt.js.map