import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

@Component({
  template:
    `<app-pagination (loadMoreEvent)="loadMore()"></app-pagination>`,
})
class TestHostComponent {
  public loadMore() { }
}

describe('PaginationComponent HostTest', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent,
        TestHostComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more courses', () => {
    const loadMoreButton = fixture.debugElement.query(By.css('.load-more'));
    loadMoreButton.triggerEventHandler('click', null);
  });
});
