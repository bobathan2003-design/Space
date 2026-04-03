import express from 'express';
import path from 'path';
import { existsSync } from 'fs';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const __dirname = process.cwd();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 25000,
});

router.use(limiter);

const sendStaticFile = (res, filePath, statusCode = 200) => {
	if (!existsSync(filePath)) {
		return res.status(404).sendFile(path.join(__dirname, 'public/err.html'));
	}

	return res.status(statusCode).sendFile(filePath, (err) => {
		if (err && !res.headersSent) {
			res.status(500).sendFile(path.join(__dirname, 'public/500.html'));
		}
	});
};

router.get('/', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/index.html'));
});

router.get('/&', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/&.html'));
});

router.get('/~', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/~.html'));
});

router.get('/g', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/g.html'));
});

router.get('/a', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/a.html'));
});

router.get('/err', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/err.html'));
});

router.get('/500', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/500.html'), 500);
});

router.get('/password', (req, res) => {
	sendStaticFile(res, path.join(__dirname, 'public/password.html'));
});

router.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'public/err.html'));
});

export default router;
