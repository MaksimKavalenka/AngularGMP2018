import { Component } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AuthorsComponent } from './authors.component';

@Component({
  template:
    `<app-authors [(authors)]="authors"></app-authors>`,
})
class TestHostComponent {
  public authors: string;
}

describe('AuthorsComponent TestHost', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthorsComponent,
        TestHostComponent,
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get authors', fakeAsync(() => {
    const newAuthor = 'New Author';
    const authorsElement = fixture.debugElement.query(By.css('#authors')).nativeElement;

    authorsElement.value = newAuthor;
    authorsElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.authors).toBe(newAuthor);
    expect(authorsElement.value).toBe(newAuthor);
  }));

  it('should set authors', fakeAsync(() => {
    const newAuthor = 'New Author';
    component.authors = newAuthor;

    fixture.detectChanges();
    tick();

    const authorsElement = fixture.debugElement.query(By.css('#authors')).nativeElement;
    expect(component.authors).toBe(newAuthor);
    expect(authorsElement.value).toBe(newAuthor);
  }));
});
