import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotesViewComponent } from './all-notes-view.component';

describe('AllNotesViewComponent', () => {
  let component: AllNotesViewComponent;
  let fixture: ComponentFixture<AllNotesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
