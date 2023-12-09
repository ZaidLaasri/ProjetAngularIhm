import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentLoggingComponent } from './assignment-logging.component';

describe('AssignmentLoggingComponent', () => {
  let component: AssignmentLoggingComponent;
  let fixture: ComponentFixture<AssignmentLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentLoggingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
