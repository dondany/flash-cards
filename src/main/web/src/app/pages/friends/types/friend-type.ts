import {UserType} from "../../../shared/services/user-type";

export type FriendType = {
  id: number,
  friend: UserType,
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING',
  initiator: boolean
}
