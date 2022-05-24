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
  datavalue: any;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };
  addByNode(doc: object) {
    return this.http.post<any>('http://localhost:8000/postdata/', doc);
  }
  getByNode() {
    return this.http.get('http://localhost:8000/get_query/');
  }

  add(db: string, doc: object): Observable<{}> {
    // const url2 = `${this.url}${db}`;
    const url = this.url + db;
    return this.http.post(url, doc, this.httpOptions)
  }
  get(db: string): Observable<{}> {
    const url = this.url + db + '/_all_docs?include_docs=true';
    return this.http.get(url, this.httpOptions)

  }
  array(obj: any) {
    console.log(obj)
    this.datavalue = obj;
    console.log(this.datavalue);

    return this.datavalue;


  }

}
