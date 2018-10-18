import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideBlockComponent } from './aside-block.component';

describe('AsideBlockComponent', () => {
  let component: AsideBlockComponent;
  let fixture: ComponentFixture<AsideBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
