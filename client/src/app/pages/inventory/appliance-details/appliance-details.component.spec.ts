import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDetailsComponent } from './appliance-details.component';

describe('ApplianceDetailsComponent', () => {
  let component: ApplianceDetailsComponent;
  let fixture: ComponentFixture<ApplianceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
