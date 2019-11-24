import { Router } from 'express';
import { seedUsers } from '../db/seeder';
const router = Router();

router.get('/users/seed', async (req, res) => {
  const users = await req.context.models.User.findAll();
  if (!users.length) {
    seedUsers(req.context.models);
    return res.send(200);
  }
  return res.send(304);
});

export default router;
