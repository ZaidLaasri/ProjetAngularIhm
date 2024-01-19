import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAssignmentComponent } from './formulaire-assignment.component';

describe('FormulaireAssignmentComponent', () => {
  let component: FormulaireAssignmentComponent;
  let fixture: ComponentFixture<FormulaireAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
