import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

import { GoogleDriveService } from './google-drive-service';
import { exit } from 'process';
import { createAndFillWorkbook } from './excel-generator';

dotenv.config();

const driveClientId = process.env['GOOGLE_DRIVE_CLIENT_ID'] || '';
const driveClientSecret = process.env['GOOGLE_DRIVE_CLIENT_SECRET'] || '';
const driveRedirectUri = process.env['GOOGLE_DRIVE_REDIRECT_URI'] || '';
const driveRefreshToken = process.env['GOOGLE_DRIVE_REFRESH_TOKEN'] || '';
const firstName = process.env['FIRST_NAME'] || '';
const lastName = process.env['LAST_NAME'] || '';
const clientName = process.env['CLIENT_NAME'] || '';

(async () => {
  const fileName = await createAndFillWorkbook({firstName, lastName, clientName});
  const finalPath = path.resolve(__dirname, `../generated/${fileName}`);

  // process.exit();
  const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

  if (!fs.existsSync(finalPath)) {
    throw new Error('File not found!');
  }

  await googleDriveService.saveFile(fileName, finalPath, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    .catch((e) => {
      console.log(e)
      console.error('File upload failed!');
      exit();
    })
    .then(() => {
      console.info('File uploaded successfully!');
      exit();
    });
})();
