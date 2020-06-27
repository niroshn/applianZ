import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { IAppliance } from 'src/app/shared/models/appliance.model';
import {Location} from '@angular/common'; 
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApplianceService } from 'src/app/shared/services/appliance.service';

@Component({
  selector: 'app-appliance-details',
  templateUrl: './appliance-details.component.html',
  styleUrls: ['./appliance-details.component.scss']
})
export class ApplianceDetailsComponent implements OnInit {
  pageTitle: string;
  isNew: boolean;
  applianceFg: FormGroup;
  appliance_name: AbstractControl;
  serial_number: AbstractControl;
  brand: AbstractControl;
  model: AbstractControl;
  status: AbstractControl;
  date_bought: AbstractControl;
  errorMessage: any;
  error = false;

  state$: Observable<object>;
  currentAppliance: IAppliance;

  constructor(public activatedRoute: ActivatedRoute, private appliancesService: ApplianceService, private router: Router, private fb: FormBuilder, private location: Location, public snackBar: MatSnackBar) {

    this.applianceFg = this.fb.group({
      appliance_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      serial_number: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      model: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      brand: ['', Validators.compose([Validators.required, Validators.minLength(12)])],
      status: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      date_bought: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.min(1)])],
      
    });
    this.appliance_name = this.applianceFg.controls['appliance_name'];
    this.brand = this.applianceFg.controls['model'];
    this.date_bought = this.applianceFg.controls['brand'];
    this.model = this.applianceFg.controls['status'];
    this.status = this.applianceFg.controls['date_bought'];
    this.serial_number = this.applianceFg.controls['serial_number'];
  }

  ngOnInit(): void {
    this.currentAppliance = window.history.state.appliance;
    if(!this.currentAppliance){
      this.isNew = true;
      this.location.replaceState("/appliances/new");
      this.pageTitle = "Add New Appliance";
    }else{
      this.isNew = false;
      this.pageTitle = "Update Appliance";
      this.initializeForm();
    }
  }

  cancel(): void {
    this.returnToApplianceList();  
  }

  delete(): void{
    
    this.appliancesService.deleteAppliance(this.currentAppliance).subscribe({
      complete: () => this.openSnackBar('success', null),
      error: err => this.errorMessage = err
    });
    this.returnToApplianceList();  
  }

  returnToApplianceList(): void{
    this.router.navigate(['/appliances']);
  }

  initializeForm(): void {
    this.appliance_name.setValue(this.currentAppliance.appliance_name);
    this.serial_number.setValue(this.currentAppliance.serial_number);
    this.brand.setValue(this.currentAppliance.brand);
    this.status.setValue(this.currentAppliance.status);
    this.date_bought.setValue(this.currentAppliance.date_bought);
    this.date_bought.setValue(this.currentAppliance.date_bought);
  }

  generateApplianceFromForm(prodId = 0): IAppliance {
    var p = {
      appliance_id: prodId,
      appliance_name: this.appliance_name.value,
      serial_number: this.serial_number.value,
      model: this.model.value,
      brand: this.brand.value,
      status: this.status.value.replace("$", ""),
      date_bought: this.date_bought.value
    };
    
    return p;
  }

  onSubmit(): void {
    if(this.isNew){
      this.currentAppliance = this.generateApplianceFromForm();
      this.appliancesService.postAppliance(this.currentAppliance).subscribe({
        complete: () => this.openSnackBar('success', null),
        error: err => this.errorMessage = err
      });
    }else{
      this.currentAppliance = this.generateApplianceFromForm(this.currentAppliance.appliance_id);
      this.appliancesService.putAppliance(this.currentAppliance).subscribe({
        complete: () => this.openSnackBar('success', null),
        error: err => this.errorMessage = err
      });
    }
    this.returnToApplianceList();  
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  formatCurrency(event)
  {
    // format the input to be USD
    let input = event.target.value;
    input = input.replace("$", "");
    var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(input);
    this.status.setValue(uy);
  }

  focusFunction() {
    this.error = false;
  }

}
