import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireEleveComponent } from './formulaire-eleve.component';

describe('FormulaireEleveComponent', () => {
  let component: FormulaireEleveComponent;
  let fixture: ComponentFixture<FormulaireEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireEleveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
