import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PanelType } from '../../shared/models/panel-type';
import { PvService } from '../../shared/api/pv.service';
import { Pv, PvBody } from '../../shared/models/pv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public panelTypeList: PanelType[] = [
    {
      serial_number: 123456,
      name: 'photovoltaic'
    },
    {
      serial_number: 654321,
      name: 'hybrid'
    },
  ];
  public submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private pvService: PvService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      company_name: ['', Validators.required],
      company_siren: ['', Validators.required],
      customer_name: ['', Validators.required],
      customer_phone_number: ['', Validators.required],
      customer_email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
      address: ['', Validators.required],
      date: [new Date(), Validators.required],
      nb_panel: [1, Validators.required],
      type: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const body: PvBody = {
        company: {
          name: formValue.company_name,
          siren: formValue.company_siren,
        },
        customer: {
          name: formValue.customer_name,
          phone_number: formValue.customer_phone_number,
          email: formValue.customer_email,
        },
        installation_date: formValue.date,
        nb_panel: formValue.nb_panel,
        type: formValue.type,
        address: formValue.address,
        solar_panels_attributes: [
          ...Array(formValue.nb_panel).keys()].map(() => ({
          type_of: formValue.type.name,
          serial_number: formValue.serial_number
        }))
      };
      this.pvService.postPv(body)
        .subscribe((res: Pv) => {
          if (!!res) {
            this.submitSuccess = true;
            setTimeout(() => {
              this.submitSuccess = false;
              this.buildForm();
            }, 5000);
          }
        })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
