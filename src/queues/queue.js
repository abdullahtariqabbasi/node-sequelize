// queue.js

import Queue from 'bull';
import sendEmail from '../workers/emailWorker';

const emailQueue = new Queue('email', {
  redis: {
    port: 6379,
    host: 'localhost',
  }
});

emailQueue.process(async (job) => {
  try {
    await sendEmail(job);
  } catch (error) {
    console.log('Error', error);
  }
});

export default emailQueue;