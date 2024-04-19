// emailWorker.js
import emailService from '../services/emailService';

async function sendEmail(job) {
  const { email, subject, text } = job.data;

  try {
    await emailService.sendRegisterEmail(email, subject, text)
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending email:', error);
    return Promise.reject(error);
  }
}

export default sendEmail;
