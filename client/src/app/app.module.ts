import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApplianceListComponent } from './pages/inventory/appliance-list/appliance-list.component';
import { ApplianceDetailsComponent } from './pages/inventory/appliance-details/appliance-details.component';
import { OkDialogComponent } from './shared/components/ok-dialog/ok-dialog.component';
import { YesNoDialogComponent } from './shared/components/yes-no-dialog/yes-no-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/modules/material-module/material-module.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApplianceListComponent,
    ApplianceDetailsComponent,
    OkDialogComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
