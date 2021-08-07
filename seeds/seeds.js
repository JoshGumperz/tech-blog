const {Post, User, Reply } = require('../models')

const postData = require("./postData.json");
const replyData = require("./replyData.json");
const userData = require("./userData.json");

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Post.bulkCreate(postData);
    
    await Reply.bulkCreate(replyData);
    
    process.exit(0);
  };
  
seedDatabase();
