import { setupServer } from './server.js';
import { initMongoDb } from './db/initMongoDb.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
try {
  await initMongoDb();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
} catch (error) {
  console.log(error);
}
setupServer();
