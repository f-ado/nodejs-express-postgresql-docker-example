import { Router } from 'express';
const router = Router();
router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});
router.get('/current', async (req, res) => {
  return res.send(req.context.currentUser);
});
router.get('/:username/todos', async (req, res) => {
  const user = await req.context.models.User.findOne({
    where: { username: req.params.username },
    include: [
      { model: req.context.models.Todo }
    ]
  });

  return res.send(user.todos);
});
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});
export default router;