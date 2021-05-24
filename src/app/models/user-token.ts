import {Role} from './role';


export interface UserToken {
  id: number;
  username: string;
  accessToken?: string;
  imageUrls?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  idLocation?: number;
  enabled?: boolean;
  roles: Role[];
  countFeedback?:number;
  percentFeedback?:number;
}
