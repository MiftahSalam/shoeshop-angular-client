import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdeitemComponent } from './ordeitem.component';

describe('OrdeitemComponent', () => {
  let component: OrdeitemComponent;
  let fixture: ComponentFixture<OrdeitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdeitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdeitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
