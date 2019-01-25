import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperListComponent } from './helper-list.component';

describe('HelperListComponent', () => {
  let component: HelperListComponent;
  let fixture: ComponentFixture<HelperListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelperListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
