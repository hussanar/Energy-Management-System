import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/'
  dbUserName = 'apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6';
  dbPassword = 'aabcfd48d07fe38f4760f6cd11b83b4a';
  basicAuth = 'Basic ' + btoa(this.dbUserName + ':' + this.dbPassword);

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  add(db: string, doc: object): Observable<{}> {
    const url = this.url + db;
    return this.http.post(url, doc, this.httpOptions)
  }
  get(db: string): Observable<{}> {
    const url = this.url + db + '/_all_docs?include_docs=true';
    return this.http.get(url, this.httpOptions)

  }


  // deleteData(deleteObj: any) {
  //   const database = deleteObj.database;
  //   const id = deleteObj.id;
  //   const deleteObj.rev;
  //   const url = this.url.database + '/' + id + '?rev=' + rev;
  //   return this.http.delete(url);

  // }

}
