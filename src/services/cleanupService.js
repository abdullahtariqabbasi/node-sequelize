import fs from 'fs';
import path from 'path';
import model from '../models';

const { User } = model;

const cleanupService = {
  async cleanProfileDirectory() {
    const UPLOADS_DIR = path.join(__dirname, '../../uploads');
    try {
      const allFiles = fs.readdirSync(UPLOADS_DIR);

      const users = await User.findAll({}, 'profilePicture');
      const usedFiles = users
                      .filter(user => user.profilePicture !== null)
                      .map(user => path.basename(user.profilePicture));

      const unusedFiles = allFiles.filter(file => !usedFiles.includes(file));

      unusedFiles.forEach(file => {
        const filePath = path.join(UPLOADS_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      });
      console.log('Unused profile picture files deleted successfully');
    } catch (error) {
      console.error('Error deleting unused profile picture files:', error);
    }
  }
};

export default cleanupService;
