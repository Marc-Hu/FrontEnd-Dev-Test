import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PvService } from './pv.service';
import { Pv, PvBody } from '../models/pv';
import { environment } from '../../../environments/environment';

describe('PvService', () => {
  let service: PvService;
  let httpController: HttpTestingController;
  let mockPv: PvBody;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient
      ]
    }).compileComponents();
    service = TestBed.inject(PvService);
    httpController = TestBed.inject(HttpTestingController);
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
      solar_panels_attributes: [
        {
          serial_number: 123456,
          type_of: 'hybrid'
        }
      ]
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call postPv and return an Object of Pv ', () => {
    service.postPv(mockPv)
      .subscribe((res: Pv) => {
        expect(res).toEqual(mockPv)
      });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.apiBase}/pv_mise_en_services`,
    });
    req.flush(mockPv);
  });
});
