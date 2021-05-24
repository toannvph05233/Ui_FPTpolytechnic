import {Post} from './post';
import {UserToken} from './user-token';
import {User} from './user';

export interface Booking {
  id?: number;
  idDoctor?: number;
  comment?:string;
  date?:string;
  status?:boolean;
  done?:boolean;
  timeEntity?:any;
  user?:User;
}
