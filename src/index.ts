import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

import { GoogleDriveService } from './google-drive-service';

dotenv.config();

const driveClientId = process.env['GOOGLE_DRIVE_CLIENT_ID'] || '';
const driveClientSecret = process.env['GOOGLE_DRIVE_CLIENT_SECRET'] || '';
const driveRedirectUri = process.env['GOOGLE_DRIVE_REDIRECT_URI'] || '';
const driveRefreshToken = process.env['GOOGLE_DRIVE_REFRESH_TOKEN'] || '';

(async () => {
  const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

  const finalPath = path.resolve(__dirname, '../test.xlsx');

  if (!fs.existsSync(finalPath)) {
    throw new Error('File not found!');
  }

  await googleDriveService.saveFile('test.xlsx', finalPath, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').catch((error) => {
    console.error(error);
  });

  console.info('File uploaded successfully!');
})();
