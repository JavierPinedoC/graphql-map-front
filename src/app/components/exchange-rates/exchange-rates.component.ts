import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-exchange-rates',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="rates">
      <div *ngFor="let rate of rates">
        <p>{{ rate.idestado }}: {{ rate.municipio }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./exchange-rates.component.css'],
})
export class ExchangeRatesComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            censos {
              idestado
              idmunicipio
              municipio
              UE
              A111A
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data.censos;
        console.log(this.rates);
        
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
