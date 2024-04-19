import nodemailer from 'nodemailer';
import emailQueue from '../queues/queue'; 
import cron from 'node-cron';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b852b3a1ccdd39",
    pass: "25f445a9119754"
  }
});

const emailService = {
  async sendEmail(options) {
    try {
      const info = await transporter.sendMail(options);
      return { success: true, info };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  },

  async sendRegisterEmail(email, subject, text) {
    const mailOptions = {
      from: 'test@mailtrap.com',
      to: email,
      subject,
      text
    };
    return await this.sendEmail(mailOptions);
  },

  async sendForgotPasswordEmail(email, token) {
    const mailOptions = {
      from: 'test@mailtrap.com',
      to: email,
      subject: "Forgot Password",
      text: `This is the link to reset your password: http://localhost:3000/reset-password/${token}`
    };
    return await this.sendEmail(mailOptions);
  },

  async enqueueEmailJob(email, subject, text) {
    try {
      await emailQueue.add({ email, subject, text });
      console.log('Email job enqueued successfully');
    } catch (error) {
      console.error('Error enqueuing email job:', error);
    }
  },

  setupReminderEmail(email, subject, text) {
    try {
      const registrationTime = new Date();
      const scheduledTime = new Date(registrationTime.getTime() + 2 * 60000);
      console.log('Scheduled Time: '+scheduledTime);
      const cronTime = `${scheduledTime.getMinutes()} ${scheduledTime.getHours()} ${scheduledTime.getDate()} ${scheduledTime.getMonth() + 1} *`;
      console.log('Cron Time: '+cronTime);
      cron.schedule(cronTime, async () => {
        await emailQueue.add({ email, subject, text });
      });
      console.log('Email job enqueued successfully');
    } catch (error) {
      console.error('Error enqueuing email job:', error);
    }
  }

};

export default emailService;
