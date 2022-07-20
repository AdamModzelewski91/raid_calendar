import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaidsComponent } from './create-raids.component';

describe('CreateRaidsComponent', () => {
  let component: CreateRaidsComponent;
  let fixture: ComponentFixture<CreateRaidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRaidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
