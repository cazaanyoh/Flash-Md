const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0pINkszUGE2TE9RWmlJN3laaWZPUERicjRLa2pXV1R1ZnQyYy93ZEhGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUs3aWFTcnVNNzV0RUZsZnNsTnNFYSttNGw4ak1IZFVIUUFRQmFhdzMzRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQ3k1OXR2TjN6QWREeUU1NjB4TGtwSlVZaUdTeGVqY0xrSzZDUklyTTNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEN2o4NWVrT3M3bjNKUVQyU0dScjhNREpqY2NRYVhyN0p3TzdnV2ZvRUFrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitJU25CTUhUZ0xVQnpldEJpZmJlVFkxQ240MFRQc29nRndWdEg0d1hCME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFVNE9RNUNSM0ZDdjVhTThTMm03NXRkZURxOFpuc2crbThGa3duQ0FxVnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU9ta3dCWmpuRGJocS8zUnBaWkVKWU9rMXhUcUdaRWlYclVvaGE2UndHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWR3c3pEVVdudHNTbFdDajI4aEdWL1h2V3pXMzBhUkJwL0xJQkVtYyttVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9Ub1NZRjlYNlZmWVFKTTFwZVozWFlscWJuWnBmUCtLcmtieW9jZkQ2cUJnK0hTSldhSGYwTkhOZUxncXFaT3ZWYUhDWEdWTkpZMFN0a1cwb2NiYkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE1LCJhZHZTZWNyZXRLZXkiOiJ4bHZoTmQ3MGFRTVlZNTZsdXJWbFhXaHRLclZLbmppMEVxUHRpaE9mdjlZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrR2RlVXhLU1I5LTJnaGZqb1dxNm1RIiwicGhvbmVJZCI6IjlmNGUxMDgzLThlYzYtNDU5My1hOTdlLTE4OTc5MzA4Y2FhZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUMVFJM1lRbjhzK3MyeFlYYmRTN3Vha3lZcEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickp2SGluY0F3cVRXK3l2VFg4dGFqY3JJM2h3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iks4SEhNUFlSIiwibWUiOnsiaWQiOiIyNTI2NzIzNTc1Mjc6NDlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lqcjdjVURFSUNXMGJvR0dFUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjU2dGRXTlVHQUVraVo4WEJkTGdwN2JpdXJBb3FHVjc4bHZhcFdiLzU3aWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdqZ042cjhObjBkTEhPdm1BNC9lUmE1UDlOLzgxUURDZ1Q2RXdKN2lDTmFwdDFwRnQ4cnBra2JSMjZ3YWtjbm5odGdLbzlWN3FvUDZiSTRsWTJlUUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpTkVoa1RyTm5ORlRlOW5uNjgrMnVVYmkySjIrd0RNQmRhUXYxVXhTZWFKWU93dnRtWTJqSHFzQVVURzV1d1ZZUTJmRG1hWGI4ZUVTd2ZqOU1DNm5BQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1MjY3MjM1NzUyNzo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlZXJYVmpWQmdCSkltZkZ3WFM0S2UyNHJxd0tLaGxlL0piMnFWbS8rZTRuIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNTc3NDg0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhHcCJ9;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
