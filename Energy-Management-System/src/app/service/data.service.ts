import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {


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
  constructor(private http: HttpClient) { }
  store(data: any) {
    console.log(data);
    this.temp = data;
    this.pusharray.push(data);
    console.log(this.pusharray)
  }
  //  update(){
  //   const url = this.url + 'hussain_new_db' + '/' + id + "?rev=";
  //   const updateObjId = { id: id, firstName: "raju", lastName: 'bhai' }
  //   return this.http.put(updateObjId, url)
  //  }
  deleteData(id: any): Observable<{}> {
    return this.http.delete(this.url + 'energy-management-login/' + id)
  }
  getDocByIds(db: string, id: any): Observable<{}> {
    const url = this.url + db + '/' + id;
    return this.http.get(url, this.httpOptions)

  }

  BookDelete(bookid: String): Observable<number> {
    let httpheaders = new HttpHeaders()
      .set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders
    };
    return this.http.delete<number>(this.url + "/" + bookid);
  }

}
