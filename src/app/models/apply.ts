import {Post} from './post';
import {UserToken} from './user-token';

export interface Apply {
  id?: number;
  postEntity?: Post;
  appUser?: UserToken;
  date?:string;
}
