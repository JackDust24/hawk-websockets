import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from the REST API!');
});

router.get('/example', (req, res) => {
  res.json({ message: 'This is an example endpoint' });
});

export default router;
