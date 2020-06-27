import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplianceListComponent } from './pages/inventory/appliance-list/appliance-list.component';
import { ApplianceDetailsComponent } from './pages/inventory/appliance-details/appliance-details.component';


const routes: Routes = [
  {path: 'appliances', component: ApplianceListComponent},
  {path: 'appliances/:id', component: ApplianceDetailsComponent},
  {path: '', redirectTo: 'appliances', pathMatch: 'full'},
  {path: '**', redirectTo: 'appliances', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
