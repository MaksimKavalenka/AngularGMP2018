import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AuthorsComponent } from './authors.component';

describe('AuthorsComponent StandAlone', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set authors', () => {
    const spyAuthorsChange = spyOn(component.authorsChange, 'emit');
    const newAuthor = 'New Author';
    component.authors = newAuthor;

    expect(component.authors).toBe(newAuthor);
    expect(spyAuthorsChange).toHaveBeenCalledWith(newAuthor);
  });
});
