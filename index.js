import express from 'express';
import dotenv from 'dotenv'
import userRoute from './src/routes/user'
import authRoute from './src/routes/auth'
import projectRoute from './src/routes/project'
import skillRoute from './src/routes/skill'
import authenticateJWT from './src/middlewares/authenticateJWT';
import cron from 'node-cron';
import cleanupService from './src/services/cleanupService';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
authRoute(app);
app.use(authenticateJWT);
userRoute(app);
projectRoute(app);
skillRoute(app);
cron.schedule('*/2 * * * *', async () => {
  console.log('Running cron job to delete unused profile picture files...');
  await cleanupService.cleanProfileDirectory();
});
app.all('*', (req, res) => res.status(404).send({
  message: 'Not Found!!!',
}));

const port = 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})