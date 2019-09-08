const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    text: DataTypes.STRING
  });

  Todo.associate = models => {
    Todo.belongsTo(models.User);
  };
  return Todo;
};
export default todo;
