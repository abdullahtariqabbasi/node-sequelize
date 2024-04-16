import express from 'express';
import dotenv from 'dotenv'
import userRoute from './src/routes/user'
import authRoute from './src/routes/auth'
import projectRoute from './src/routes/project'
import skillRoute from './src/routes/skill'
import authenticateJWT from './src/middlewares/authenticateJWT';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
authRoute(app);
app.use(authenticateJWT);
userRoute(app);
projectRoute(app);
skillRoute(app);
app.all('*', (req, res) => res.status(404).send({
  message: 'Not Found!!!',
}));

const port = 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})