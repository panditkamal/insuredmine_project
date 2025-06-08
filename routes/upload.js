import express from 'express';
import multer from 'multer';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/upload', upload.single('file'), (req, res) => {
  const worker = new Worker(path.resolve(__dirname, '../workers/uploadWorker.js'), {
    workerData: { filePath: req.file.path }
  });

  worker.on('message', () => res.status(200).send('Upload completed via worker'));
  worker.on('error', err => res.status(500).send('Worker error: ' + err));
});

export default router;
