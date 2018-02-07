import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../../../../../backend/src/api/customers/customer";
import {ResultList} from "../../../../../../backend/src/api/general/models/result-list";

@Component({
  selector: 'app-customers-root',
  templateUrl: './customers-root.component.html',
  styleUrls: ['./customers-root.component.css']
})
export class CustomersRootComponent implements OnInit {
  customers: Customer[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<ResultList<Customer>>('http://localhost:5000/api/customers')
      .subscribe(result => this.customers = result.items);
  }

}
