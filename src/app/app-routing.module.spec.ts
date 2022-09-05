import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Component, NgModule, NgModuleFactory } from '@angular/core';

import { AppComponent } from "./app.component";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppModule } from './app.module';
import { HomeModule } from './modules/home/home.module';
import { NotFoundModule } from './modules/not-found/not-found.module';

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppRoutingModule,
      ],
      declarations: [AppComponent],
      providers: [
        Location,
        SpyNgModuleFactoryLoader
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router.initialNavigation()
  });

  it('should navigate', () => {
    // Todo learn how to test lazy loading modules
    // const location: Location = TestBed.inject(Location);
    // const router: Router = TestBed.inject(Router);
    //
    // router.navigate(['/']);
    // console.log(location.path())
    // const loader = TestBed.inject(SpyNgModuleFactoryLoader)
    // loader.stubbedModules = {lazyModule: NotFoundModule}
    //
    // router.navigateByUrl('/not-found')
    // setTimeout(() => {
    //   console.log(location.path())
    // }, 1)
    // fixture.detectChanges()
    // console.log(location.path())
    // expect(location.path()).toEqual('')

    // fixture.detectChanges()
    // router.navigate(['/not-found']);
    // tick()
    // console.log(location.path())
    // expect(location.path()).toEqual('not-found')
  })
});
