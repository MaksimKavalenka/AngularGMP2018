import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';

@Component({
  template:
    `<app-loader (loadMoreEvent)="loadMore()"></app-loader>`,
})
class TestHostComponent {
  public loadMore() { }
}

describe('LoaderComponent HostTest', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent, TestHostComponent],
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
