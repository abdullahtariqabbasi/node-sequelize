import express from 'express';
import dotenv from 'dotenv'
import userRoute from './src/routes/user'
import authRoute from './src/routes/auth'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
authRoute(app);
userRoute(app);
app.all('*', (req, res) => res.status(404).send({
  message: 'Not Found!!!',
}));

const port = 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})