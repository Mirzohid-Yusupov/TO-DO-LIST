const db = require("../utils/sql.helper");
const crypto = require("crypto");
const jwt = require("../Service/jwt.service");

class login {
    static async register(data) {
        try {
            const checkSql = "SELECT * FROM users WHERE username = ?";
            const existingUser = await db.Query(checkSql, [data.username]);

            if (existingUser.length > 0) {
                throw new Error("Username is already taken");
            }

            const user_id = crypto.randomBytes(4).toString("hex");
            data.user_id = user_id;
            data.password = await jwt.hashPassword(data.password);

            const sql = "INSERT INTO users SET ?";
            const result = await db.Query(sql, data);

            if (result?.affectedRows) {
                return "User is added";
            } else {
                throw new Error("User is not added");
            }
        } catch (err) {
            throw err;
        }
    }


    static async login({ username, password }) {
        try {
            const hashPassword = await jwt.hashPassword(password);
            const sql =
                "SELECT * FROM users WHERE username = ? AND password = ?";
            const result = await db.Query(sql, [username, hashPassword]);

            if (result?.length) {
                const user = result[0];
                const data = {
                    user_id: user.user_id,
                    username: user.username,
                    password: user.password,
                };
                delete user.password;

                const token = await jwt.generateToken(data);

                return { user };
            } else {
                throw new Error("Username or Password is incorrect");
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = login;
