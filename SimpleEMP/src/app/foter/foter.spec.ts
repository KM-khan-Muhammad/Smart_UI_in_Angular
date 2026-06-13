import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foter } from './foter';

describe('Foter', () => {
  let component: Foter;
  let fixture: ComponentFixture<Foter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foter],
    }).compileComponents();

    fixture = TestBed.createComponent(Foter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
