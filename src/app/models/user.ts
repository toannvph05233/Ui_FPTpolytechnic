import {Role} from './role';


export interface User {
  id?: number;
  username?: string;
  // password?: string;
  locationEntity?: any;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  enabled?: boolean;
  roles?: [Role];
  imageUrls?: string;
  introduce?: string;
  price?: number;
  countFeedback?:number;
  percentFeedback?:number;
}
