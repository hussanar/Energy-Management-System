import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //https://username:password@URL.
  Urlpwd = 'https://apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6:aabcfd48d07fe38f4760f6cd11b83b4a@b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/'
  temp: any;
  pusharray: any = [];
  url = 'https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/'
  dbUserName = 'apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6';
  dbPassword = 'aabcfd48d07fe38f4760f6cd11b83b4a';
  basicAuth = 'Basic ' + btoa(this.dbUserName + ':' + this.dbPassword);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };
  viewid: any;
  constructor(private http: HttpClient) { }
  store(data: any) {
    console.log(data);
    this.temp = data;
    this.pusharray.push(data);
    console.log(this.pusharray)
  }
  save(Obj: Object) {
    console.log(Obj);
    this.temp = Obj;
    this.pusharray.push(Obj);
    console.log(this.pusharray)

  }
  login(email: string, password: string, type: string) {
    let url = this.url + 'energy-management-login/_find'
    let loginData = {
      selector: {
        type: type,
        email: email,
        password: password
      },
      fields: ["_id", "firstName", "email", "phone"]
    };
    return this.http.post(url, loginData, this.httpOptions)
  }
  updateData(updateobj: any) {
    const id = updateobj.id;
    const rev = updateobj.rev;
    const changedObj = updateobj.changedVal;
    const url = this.url + 'energy-management-login/' + id + '/rev=' + rev;
    return this.http.put(url, changedObj)
  }
  deleteData(id: any, rev: any): Observable<{}> {
    const urld = this.url + 'energy-management-login/' + id + '/?rev=' + rev;
    return this.http.delete(urld, this.httpOptions);
  }

  getDocByIds(db: string, id: any): Observable<{}> {
    const url = this.url + db + '/' + id;
    return this.http.get(url, this.httpOptions);

  }
  getDataById(database: string, id: any) {
    const url = this.url + database + '/' + id;
    return this.http.get(url, this.httpOptions);
  }


  view1(id: any) {
    this.viewid = id;
    console.log(this.viewid);

  }
}
