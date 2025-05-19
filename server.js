const app = require('./app');
const db  = require('./models');
require('./schedules/weatherNotifier');

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
