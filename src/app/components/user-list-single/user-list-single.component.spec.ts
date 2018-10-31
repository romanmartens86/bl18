import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSingleComponent } from './user-list-single.component';

describe('UserListSingleComponent', () => {
  let component: UserListSingleComponent;
  let fixture: ComponentFixture<UserListSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
