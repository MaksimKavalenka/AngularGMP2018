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

describe('ToolboxComponent TestHost', () => {
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

  it('should apply a search query', () => {
    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);

    expect(component.searchQuery).toBe(testSearchQuery);
    expect(component.parentSearchQuery).toBe(testSearchQuery);
  });

  it('should apply a search query after a value editing', () => {
    component.searchQuery = 'New value';

    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);

    expect(component.parentSearchQuery).toBe(component.searchQuery);
  });
});
