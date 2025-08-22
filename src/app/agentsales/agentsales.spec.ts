import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agentsales } from './agentsales';

describe('Agentsales', () => {
  let component: Agentsales;
  let fixture: ComponentFixture<Agentsales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agentsales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agentsales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
