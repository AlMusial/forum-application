/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddThreadComponent } from './add-thread.component';

describe('AddThreadComponent', () => {
  let component: AddThreadComponent;
  let fixture: ComponentFixture<AddThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
