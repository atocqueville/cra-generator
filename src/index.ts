import dotenv from 'dotenv';

dotenv.config();

console.log(process.env['GOOGLE_DRIVE_CLIENT_ID']);
console.log(process.env['GOOGLE_DRIVE_CLIENT_SECRET']);
console.log(process.env['GOOGLE_DRIVE_REDIRECT_URI']);
console.log(process.env['GOOGLE_DRIVE_REFRESH_TOKEN']);
