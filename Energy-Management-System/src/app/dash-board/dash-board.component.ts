import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  temp: any;
  variable: any;
  TotalNumberOfUsers: any;
  email: any;
  response: any;
  typedData: any;
  total: any;
  localObject: any;
  localvalue: any;
  id: any;
  name: any;
  type: string | undefined
  value: any;
  arrayVal: any;
  length: any = 0;
  electricty: any;
  responseData: any;
  sample: any;
  viewVal: any = [];
  waterlength: any;
  electrictylength: any;
  gaslenght: number | undefined
  reneewablelength: any;
  UserId: any;
  userObject: any;
  user: any;
  private _id: any;


  constructor(private router: Router, private Acrouter: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    this._id = user['_id']
    this.name = user['firstName']
    this.email = user['email']
    console.log(this._id)
    localStorage.setItem("userdetails", this._id)
    this.localObject = localStorage.getItem("userdetails")
    this.Acrouter.queryParams.subscribe((params: any) => {

      console.log(params);
      this.id = params.data
      console.log(this.id);
      this.data.getDataByViewDoc('energy-management-login', 'water', this.localObject).subscribe(res => {
        console.log(res)
        this.responseData = res
        this.sample = this.responseData.rows
        console.log(this.sample);

        for (const iterator of this.sample) {
          this.viewVal.push(iterator.doc);
        }
        this.length = this.viewVal.length
        console.log(this.length)
      })

    })
    this.getDataByView("water");
    this.getDataLength()
    this.gasDataLength();

    this.getDataByUser()
    this.lengthOfArray()
    let db = 'energy-management-login';
    this.data.getnumbers(db).subscribe((res => {
      console.log(res);
      this.temp = res;
      this.TotalNumberOfUsers = this.temp.rows.length;
      this.Acrouter.queryParams.subscribe(response => {
        console.log(response);
        this.data.getDocByIds("energy-management-login", response.data).subscribe(response => {
          console.log(response)
          this.temp = response
          this.localvalue = this.temp._id
          console.log(this.localvalue)

          localStorage.setItem("userdetails", this.localvalue)
          this.email = this.temp.email
          this.name = this.temp.firstName
          this.localObject = localStorage.getItem("userdetails")
          console.log(this.localObject)
          this.email = localStorage.getItem('userObject')


        })
      })
    }))
  }

  lengthOfArray() {
    this.type = "water";

    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    console.log(user)
    this.data.getByTypedUser(this.type, this._id).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
    })
    this.type = "electricty"

    this.data.getByTypedUser(this.type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      this.electricty = this.arrayVal.length
      console.log(this.length)
    })

  }
  ele() {
    this.router.navigate(['ele'], { queryParams: { data: this.localObject } })
  }
  water() {
    this.router.navigate(['water'], { queryParams: { data: this.localObject } });
  }
  gas() {
    this.router.navigate(['gas'], { queryParams: { data: this.localObject } });
  }
  renewable() {
    this.router.navigate(['renewable'], { queryParams: { data: this.localObject } })
  }
  adddata() {
    this.router.navigate(['adddata'], { queryParams: { data: this.localObject } })
  }
  logout() {
    localStorage.clear();
  }
  view() {
    this.router.navigate(['viwe'])
  }
  getDataByView(type: string) {
    this.data.getDataByViewDoc('energy-management-login', type, this.localObject).subscribe(res => {
      console.log(res)
      this.responseData = res
      this.sample = this.responseData.rows
      console.log(this.sample);
      this.viewVal = this.sample.map((el: any) => el.doc)
      this.waterlength = this.viewVal.length
      console.log(this.waterlength)
    })
  }
  getDataLength() {
    this.type = "electricty"
    this.localObject = localStorage.getItem("userdetails")
    console.log(this.localObject)
    this.data.getByTypedUser(this.type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      this.electrictylength = this.arrayVal.length
    });

  }
  gasDataLength() {
    this.type = "gas"
    this.data.getByTypedUser(this.type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
      this.gaslenght = this.arrayVal.length
      console.log(this.gaslenght)
    }, err => { console.log(err) })
  }

  getDataByUser() {
    this.type = "renewable"
    this.Acrouter.queryParams.subscribe(res => {
      this.id = res.data
      this.localObject = localStorage.getItem("userdetails")
      console.log(this.localObject)
      this.type = "renewable"
      let userObject: any = localStorage.getItem('userData')
      let user = JSON.parse(userObject.toString())
      console.log(user)
      this.data.getByTypedUser(this.type, this.localObject).subscribe(response => {
        console.log(response)
        this.value = response;
        this.arrayVal = this.value.docs
        console.log(this.arrayVal)
        this.reneewablelength = this.arrayVal.length
        console.log(this.reneewablelength)


      }, err => { console.log(err) })
    })
  }
  navigateWater() {
    this.router.navigate(['watertable'], { queryParams: { data: this._id } })
  }
  navigateelectricty() {
    this.router.navigate(['eletable'], { queryParams: { data: this._id } })
  }
  navigategas() {
    this.router.navigate(['gas'], { queryParams: { data: this._id } })
  }
  navigaterenewable() {
    this.router.navigate(['rennewabletable'], { queryParams: { data: this._id } })
  }
  navigateadddata() {
    this.router.navigate(['adddata'], { queryParams: { data: this._id } })
  }
}

