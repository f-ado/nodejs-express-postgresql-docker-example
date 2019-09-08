import { Router } from 'express';
const router = Router();
router.get('/', async (req, res) => {
  const todos = await req.context.models.Todo.findAll();
  return res.send(todos);
});
router.get('/:id', async (req, res) => {
  const todo = await req.context.models.Todo.findByPk(
    req.params.id,
  );
  return res.send(todo);
});
router.post('/', async (req, res) => {
  const todo = await req.context.models.Todo.create({
    text: req.body.text,
    userId: req.context.currentUser.id,
  });
  return res.send(todo);
});
router.delete('/:id', async (req, res) => {
  await req.context.models.Todo.destroy({
    where: { id: req.params.id },
  });
  return res.send(true);
});
export default router;