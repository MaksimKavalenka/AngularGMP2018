import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ToolboxComponent } from './toolbox.component';

const testSearchQuery = 'Test search query';

describe('ToolboxComponent StandAlone', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolboxComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply a search query', () => {
    let search: string;
    component.searchEvent.subscribe((searchQuery: string) => search = searchQuery);

    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);

    expect(search).toEqual(component.searchQuery);
  });

  it('should apply a search query after a value editing', () => {
    component.searchQuery = 'New value';

    let search: string;
    component.searchEvent.subscribe((searchQuery: string) => search = searchQuery);

    const searchButton = fixture.debugElement.query(By.css('.search'));
    searchButton.triggerEventHandler('click', null);

    expect(search).toEqual(component.searchQuery);
  });
});
