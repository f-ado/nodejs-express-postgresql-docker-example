const seedUsers = async (models) => {
    const users = await models.User.findAll();
    if (!users.length) {
      await models.User.create(
        {
          username: 'brucewayne',
          todos: [ { text: 'Meet the joker', } ],
        },
        { include: [models.Todo] },
      );
    
      await models.User.create(
        {
          username: 'tonystark',
          todos: [
            { text: 'Create Iron man\'s armor' },
            { text: 'Defeat Thanos' }
          ],
        },
        { include: [models.Todo] },
      );
    }
  };

  export { seedUsers };