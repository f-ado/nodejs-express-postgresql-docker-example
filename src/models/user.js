const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  User.associate = models => {
    User.hasMany(models.Todo, { onDelete: 'CASCADE' });
  };

  User.findByUsername = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    return user;
  };

  return User;
};
export default user;
