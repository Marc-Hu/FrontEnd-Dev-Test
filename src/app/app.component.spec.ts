import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {
  NgbDateAdapter,
  NgbDateNativeUTCAdapter,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AppRoutingModule,
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [
        FormBuilder,
        { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter },
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
