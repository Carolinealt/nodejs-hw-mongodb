import { setupServer } from './server.js';
import { initMongoDb } from './db/initMongoDb.js';
try {
  await initMongoDb();
} catch (error) {
  console.log(error);
}
setupServer();
