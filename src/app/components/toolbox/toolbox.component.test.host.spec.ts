import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ToolboxComponent } from './toolbox.component';

const testSearchQuery = 'Test search query';

@Component({
  template:
    `<app-toolbox (searchEvent)="search($event)"></app-toolbox>`,
})
class TestHostComponent {
  public searchQuery: string = testSearchQuery;
  public parentSearchQuery: string;

  public search() {
    this.parentSearchQuery = this.searchQuery;
  }
}

describe('ToolboxComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolboxComponent, TestHostComponent],
      imports: [FormsModule],
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

  it('should have appropriate search query information', () => {
    expect(component.searchQuery).toEqual(testSearchQuery);
  });

  it('should apply a search query', () => {
    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);
    expect(component.searchQuery).toEqual(testSearchQuery);
    expect(component.parentSearchQuery).toEqual(testSearchQuery);
  });

  it('should apply a search query after a value editing', () => {
    component.searchQuery = 'New value';
    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);
    expect(component.parentSearchQuery).toEqual(component.searchQuery);
  });
});
