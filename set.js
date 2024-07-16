const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0l2UktQSGRCeW9TZ1MxZHFZSjQwczgzUS9xTlcwT0ZmcVVGN0xnQVYyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHpqeEovcWlMME9OOFFUMW1QQXByL3I2ZGR4VmlFdFRFak5WcTVPTGtRdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SC9CdmFIQWpWQzY3RzNDWFhwSnVmWkFqelIyc1o1am1iNDhoWmt4cVdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqdmh6aUFrd3dnRW5JSmdaeHgzRjVXOCtySDVGYjlhcnFKeFZqd0JnYWljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdMdHdxZDZJRjRlcjdISUJvb2kxc3l0WjFvVGYrTzdaNWRtMC9rMzEzbk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN4SjRJZ1Njb3BEcDZHVEJQeGZCMnhCaVpEY3l5V0lLTml6aHh0WDhMRms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0RvWVFPSTBYaE1yam40Q1owK0ljcEwzZjMzb2s4SXJrSGNxSzJBMk9VTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJHUG0zRFhEaUdsclhBQzlaS1NMbUdNUy9SbEp4c25tSUlHa0Nucnpnaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InEwU3FuZGRVaDRTMnE4VjRnbjhrRnVtSkZQcnFJaFk3U3gvaDFWdWhwVVlOSHlseU9vWmN2dTlEZHEvQTVTbmlNMStzRnJuSVpqWjBuQ25xdklUK0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjExLCJhZHZTZWNyZXRLZXkiOiJHMjJGTzMyYXppYjhnbzQxRWh3OWZPdHI2T1prbnpQZmUzc0Y5eGQvYWE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxNzg3MjMyNDgwOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyNjYzNTJFRUZEMjEzNDFEODEwQ0ExREY2NzNFRjE5QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTEzMTgwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzZXA5dmtWSFRpRzRoVllmSUw2S2NnIiwicGhvbmVJZCI6Ijg0N2FlYjc5LWMwNjctNDQzZi05NzQ1LTEwY2VkZGE1ODc5YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5ZzQ1YXZidkZockkyVWd0VEhsMTdJRGNUU2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSW5WZmp3dEhrS2VvbUU4QlBoUVRSelRGUkhNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlY5QTFUM0ZHIiwibWUiOnsiaWQiOiI5MTc4NzIzMjQ4MDk6NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHZIaHFzRUVNeTAyTFFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoid2RiMDdpaFErWUFOd0xmMHkxbFlKY0ZsTGh5VzlPTDI4M3BvVDV2V00wZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRGh4elEvakxDak8xekFVZ0NVVHBOakpIaENyQVphZHZPbzdDK3BsQVdYTDBIbEhDMENoWEd6ZEpMNlA0NGNXSi9ETndld3RJZlBaNFgxdzN4NnZaQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IjFjMmJGaWRJSXhsTVlXRzQxWjNDNCtWb2d4VmwwS3lYamhCWFY0NXR0QUdjdE1Nek92c3FTYjFQc1ErMjZsVG1EQXBwSzhOVm0wRThST3NVNVlZRkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE3ODcyMzI0ODA5OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0hXOU80b1VQbUFEY0MzOU10WldDWEJaUzRjbHZUaTl2TjZhRStiMWpOSSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTExMzE3NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDYVkifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "SKETO",
    NUMERO_OWNER : process.env.OWNER_NUM || "919064560840",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'SKETO bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
