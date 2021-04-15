import {User} from './user';

export interface Messenger {
  id?: number;
  appUser?: User;
  messenger?: string;
  romChatEntity?: any;
}
