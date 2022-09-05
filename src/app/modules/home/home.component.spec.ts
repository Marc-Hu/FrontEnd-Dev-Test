import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { PvService } from '../../shared/api/pv.service';
import { Pv } from '../../shared/models/pv';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPvService: any;
  let mockPv: Pv;

  beforeEach(async () => {
    mockPv = {
      company: {
        name: 'test',
        siren: 'test',
      },
      customer: {
        name: 'test',
        phone_number: 'test',
        email: 'test@test.test',
      },
      installation_date: new Date().toISOString(),
      nb_panel: 1,
      type: {
        serial_number: 654321,
        name: 'hybrid'
      },
      address: 'test',
    };
    mockPvService = jasmine.createSpyObj('PvService', ['postPv']);
    mockPvService.postPv.and.returnValue(of(mockPv));
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NgbDatepickerModule,
        NgbAlertModule
      ],
      providers: [
        HttpClient,
        {
          provide: PvService,
          useValue: mockPvService
        }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the right form group', () => {
    fixture.detectChanges();
    expect(component.form.value.hasOwnProperty('company_name')).toBeTrue();
    expect(component.form.value.hasOwnProperty('company_siren')).toBeTrue();
    expect(component.form.value.hasOwnProperty('customer_name')).toBeTrue();
    expect(component.form.value.hasOwnProperty('customer_phone_number')).toBeTrue();
    expect(component.form.value.hasOwnProperty('customer_email')).toBeTrue();
    expect(component.form.value.hasOwnProperty('address')).toBeTrue();
    expect(component.form.value.hasOwnProperty('date')).toBeTrue();
    expect(component.form.value.hasOwnProperty('nb_panel')).toBeTrue();
    expect(component.form.value.hasOwnProperty('type')).toBeTrue();
  });

  it('should call postPv method in onSubmit', fakeAsync(() => {
    spyOn(component, 'buildForm');
    component.form.patchValue({
      company_name: 'test',
      company_siren: 'test',
      customer_name: 'test',
      customer_phone_number: 'test',
      customer_email: 'test@test.fr',
      address: 'test',
      date: {
        "year": 2022,
        "month": 9,
        "day": 15
      },
      nb_panel: 1,
      type: {
        serial_number: 654321,
        name: 'hybrid'
      }
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(mockPvService.postPv).toHaveBeenCalled();
    expect(component.submitSuccess).toBeTrue();
    tick(5000);
    expect(component.submitSuccess).toBeFalse();
    expect(component.buildForm).toHaveBeenCalled();
  }));

  it('should call postPv method in onSubmit', fakeAsync(() => {
    mockPvService.postPv.and.returnValue(of(null));
    spyOn(component, 'buildForm');
    component.form.patchValue({
      company_name: 'test',
      company_siren: 'test',
      customer_name: 'test',
      customer_phone_number: 'test',
      customer_email: 'test@test.fr',
      address: 'test',
      date: {
        "year": 2022,
        "month": 9,
        "day": 15
      },
      nb_panel: 1,
      type: {
        serial_number: 654321,
        name: 'hybrid'
      }
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(mockPvService.postPv).toHaveBeenCalled();
    expect(component.submitSuccess).toBeFalse();
  }));

  it('should call form.markAllAsTouched method in onSubmit', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.form.patchValue({
      company_name: 'test',
      company_siren: 'test',
      customer_name: 'test',
      customer_phone_number: 'test',
      customer_email: 'test@test.fr',
      address: 'test',
      date: null,
      nb_panel: 1,
      type: {
        serial_number: 654321,
        name: 'hybrid'
      }
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });
});
