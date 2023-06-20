import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendType} from "./types/friend-type";

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  getFriends(): Observable<FriendType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<FriendType[]>('/api/friends', { headers });
  }

  addFriend(userId: number): Observable<FriendType> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<FriendType>('/api/friends', { "userId": userId } ,{ headers });
  }

  acceptFriend(friendId: number): Observable<FriendType> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch<FriendType>(`/api/friends/${friendId}/accept`,{}, { headers });
  }

  rejectFriend(friendId: number): Observable<FriendType> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch<FriendType>(`/api/friends/${friendId}/reject`,{},{ headers });
  }

  deleteFriend(friendId: number) {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(`/api/friends/${friendId}`,{ headers });
  }
}
