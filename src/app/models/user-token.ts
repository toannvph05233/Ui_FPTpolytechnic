import {Role} from './role';


export interface UserToken {
  id: number;
  username: string;
  accessToken?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  idLocation?: number;
  enabled?: boolean;
  roles: Role[];
}
