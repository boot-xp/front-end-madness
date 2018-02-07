import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customers-root',
  templateUrl: './customers-root.component.html',
  styleUrls: ['./customers-root.component.css']
})
export class CustomersRootComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:5000/api/customers')
      .subscribe(() => {});
  }

}
