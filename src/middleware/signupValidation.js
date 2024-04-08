export function validateSignUp(req, res, next) {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name || !phone) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  next();
}