import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FormService {
  private mongoDB = 'https://raid-calendar-be.herokuapp.com/'
  
  constructor(private http: HttpClient) {}  

  getUsersActivity(): Observable<any>{
    return this.http.get( this.mongoDB + 'api/raids')
  }

  getPlayers(): Observable<any>{
    return this.http.get( this.mongoDB + 'api/players')
  }

  saveRaidGroup(myRaids: any) {
    this.http.post( this.mongoDB + 'api/raids', myRaids.value)
      .subscribe((res: any) => console.log(res.message))
  }

  sendSurvey(userActivity: any) {     
    this.http.post( this.mongoDB + 'api/players', userActivity.value)
      .subscribe((res: any) => {
        console.log(res.message);
        userActivity.reset();
      })
    
  }
}
