// Each channel has a name and can have many posts
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define("Channels", {
    channelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Channels.associate = (models) => {
    Channels.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };

  return Channels;
};
