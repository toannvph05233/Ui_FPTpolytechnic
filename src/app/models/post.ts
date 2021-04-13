import {User} from './user';
import {Images} from './images';

export interface Post {
  id?: number;
  createAt?: string;
  notification?: string;
  content?: string;
  status?: number;
  user?: User;
  postIdShear?: number;
  imgs?: string;
  post?: Post;
}
