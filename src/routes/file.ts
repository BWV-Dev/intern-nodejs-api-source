import { Router } from 'express';

import FileController from '../controllers/file';

export default function (db: SQLize) {
  const fileRouter = Router();
  const fileController = new FileController(db);

  fileRouter.get('/exportCSV', fileController.exportCSV);

  fileRouter.post('/importCSV', fileController.importCSV);

  return fileRouter;
}
