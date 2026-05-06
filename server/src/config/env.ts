import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export const env = {
    PORT: Number(process.env.PORT || 3000),
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

    DB_HOST: required("DB_HOST"),
    DB_USER: required("DB_USER"),
    DB_PASSWORD: required("DB_PASSWORD"),
    DB_NAME: required("DB_NAME"),

    JWT_SECRET: required("JWT_SECRET"),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

    TICKETMASTER_API_KEY: required("TICKETMASTER_API_KEY"),
    TICKETMASTER_BASE_URL:
        process.env.TICKETMASTER_BASE_URL ||
        "https://app.ticketmaster.com/discovery/v2",
    TICKETMASTER_DEFAULT_CITY:
        process.env.TICKETMASTER_DEFAULT_CITY || "Belgrade",
    TICKETMASTER_DEFAULT_COUNTRY_CODE:
        process.env.TICKETMASTER_DEFAULT_COUNTRY_CODE || "RS",
};