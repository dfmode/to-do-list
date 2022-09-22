import bcrypt, { hash } from "bcrypt";
import Joi, { string } from "joi";
import express from "express";
import jwt from "jsonwebtoken";

import db from "../db/db.js"
import { TOKEN_KEY } from "../config/config.js";
import { redisClient } from "../cache/cache.js";

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,20}$/).required()
});

export async function register(req: express.Request, res: express.Response) {
    const {username, password} = req.body;
    if (!await validCredentials(username, password)) {
        return res.status(400).json({
            ok: false,
            error: "invalid credentials"
        });
    };

    let hashedPassword;
    try {
        hashedPassword = bcrypt.hashSync(password, 10);
    } catch(err) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    };

    try {
        const result = await db.usersCollection.findOne({
            username: username
        })

        if (result) {
            return res.status(400).json({
                ok: false,
                error: "user already exists"
            });
        }
    } catch(err) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    };

    let user;
    try {
        user = await db.usersCollection.insertOne({
            username: username,
            password: hashedPassword
        });
    } catch(err) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    }

    const token = await issueToken(username);
    if (!token) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    }
    
    return res.status(201).json({
        ok: true,
        token: token
    })
}

export async function login(req: express.Request, res: express.Response) {
    const {username, password} = req.body;
    if (!await validCredentials(username, password)) {
        return res.status(400).json({
            ok: false,
            error: "invalid credentials"
        });
    };

    let user;
    try {
        user = await db.usersCollection.findOne({username: username});
        if (!user) {
            return res.status(401).json({
                ok: false,
                error: "invalid credentials"
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                ok: false,
                error: "invalid credentials"
            });
        }
    } catch (err) {
        return res.status(401).json({
            ok: false,
            error: "invalid credentials"
        });
    }

    const token = await issueToken(username);
    if (!token) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    }

    return res.status(200).json({
        ok: true,
        token: token
    })
}

export async function logout(req: express.Request, res: express.Response) {
    const username = await authorized(getTokenFromHeaders(req));
    if (!username) {
        return res.status(401).json({
            ok: false,
            error: "unauthorized"
        });
    }

    try {
        await redisClient.del(username);    
    } catch(err) {
        return res.status(500).json({
            ok: false,
            error: "internal server error"
        });
    }
    
    return res.status(200).json({
        ok: true
    })
}

async function issueToken(username: string): Promise<string> {
    const token = jwt.sign({username: username}, TOKEN_KEY, {
        expiresIn: "1d",
    });

    if (await redisClient.set(username, token) !== "OK") {
        return "";
    }

    return token;
}

function getTokenFromHeaders(req: express.Request): string {
    if (!req.headers['authorization']) {
        return "";
    }

    const authHeader = <Array<string>>req.headers['authorization'].split(' ');
    if (authHeader.length !== 2) {
        return "";
    }

    if (authHeader[0] !== "Bearer") {
        return "";
    }

    return authHeader[1];
}

async function authorized(token: string): Promise<string> {
    const username = validToken(token);
    if (!username) {
        return ""
    }

    if (!await redisClient.get(username)) {
        return ""
    }

    return username
}

function validToken(token: string): string {
    let decoded: jwt.JwtPayload;
    try {
        decoded = <jwt.JwtPayload>jwt.verify(token, TOKEN_KEY);
    } catch(err) {
        return ""
    }

    return decoded.username;
}

async function validCredentials(username: string, password: string): Promise<boolean> {
    try {
        await userSchema.validateAsync({
            username: username,
            password: password
        });
    } catch(err) {
        return false;
    }

    return true
}
