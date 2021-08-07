const Post = require('./Post');
const Reply = require('./Reply');
const User = require('./User');


User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' 
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Reply, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Reply.belongsTo(User, {
  foreignKey: 'user_id'
})

Post.hasMany(Reply, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Reply.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = {
  Post,
  User,
  Reply
};
