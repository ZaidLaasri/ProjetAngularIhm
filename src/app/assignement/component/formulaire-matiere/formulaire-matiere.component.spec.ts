import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireMatiereComponent } from './formulaire-matiere.component';

describe('FormulaireMatiereComponent', () => {
  let component: FormulaireMatiereComponent;
  let fixture: ComponentFixture<FormulaireMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireMatiereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
