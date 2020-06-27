import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplianceService } from 'src/app/shared/services/appliance.service';
import { IAppliance } from '../../../shared/models/appliance.model'
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appliance-list',
  templateUrl: './appliance-list.component.html',
  styleUrls: ['./appliance-list.component.scss']
})
export class ApplianceListComponent implements OnInit {

  errMsg: string;
  pageTitle: string = 'Appliance List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  appliances: IAppliance[] = [];
  sortedData: IAppliance[] = [];
  constructor(private appliancesService: ApplianceService, private router: Router) { }

  ngOnInit(): void {
    this.loadApplianceData();
  }

  loadApplianceData(): void {
    this.appliancesService.getAppliances().subscribe({
      next: appliances => {
        this.appliances = appliances;
        this.sortedData = appliances;
      },
      error: err => this.errMsg = err
    });
  }

  navigateToAppliance(appliance: IAppliance){
    console.log(appliance)
    this.router.navigate(['/appliances', appliance.appliance_id], {state: {appliance: appliance}});
  }

  createNew(): void{
    this.router.navigate(['/appliances/new']);
  }

  // sortData(sort: Sort) {
  //   const data = this.appliances.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'model': return compare(a.model, b.model, isAsc);
  //       case 'brand': return compare(a.brand, b.brand, isAsc);
  //       case 'name': return compare(a.appliance_name, b.appliance_name, isAsc);
  //       case 'serial_number': return compare(a.serial_number, b.serial_number, isAsc);
  //       case 'price': return compare(a.status, b.status, isAsc);
  //       case 'onHand': return compare(a.date_bought, b.date_bought, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
