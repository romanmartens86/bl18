import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOwnComponent } from './user-own.component';

describe('UserOwnComponent', () => {
  let component: UserOwnComponent;
  let fixture: ComponentFixture<UserOwnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOwnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
