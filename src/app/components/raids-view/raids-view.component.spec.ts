import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidsViewComponent } from './raids-view.component';

describe('RaidsViewComponent', () => {
  let component: RaidsViewComponent;
  let fixture: ComponentFixture<RaidsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaidsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
