import {UserType} from "../../../shared/services/user-type";

export type ProjectType = {
  id: number,
  name: string,
  description: string,
  owner: string,
  visibility: 'PRIVATE' | 'PUBLIC',
  members: UserType[]
}
