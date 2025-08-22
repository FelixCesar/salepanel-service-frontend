import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supersales } from './supersales';

describe('Supersales', () => {
  let component: Supersales;
  let fixture: ComponentFixture<Supersales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supersales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supersales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
