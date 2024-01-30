import * as fs from 'fs';
import { User } from 'src/user/user.entity';

export class UserUtil {
  jsonFile: string = ''; //? => Add here your jsonFile url to perform the insert of users
  userList: User[] = [];

  constructor() {
    this.loadDataFromFile();
  }

  loadDataFromFile() {
    if (this.jsonFile !== '') {
      const jsonData = fs.readFileSync(this.jsonFile, 'utf-8');
      this.userList = JSON.parse(jsonData);
    }
  }
}
