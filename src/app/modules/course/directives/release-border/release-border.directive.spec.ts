import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ReleaseBorderDirective } from './release-border.directive';
import { Course } from '../../entities/course';

const testCourses: Course[] = [
  new Course({
    id: '1',
    title: 'Video Course 1',
    duration: 31,
    creationDate: new Date(Date.now() + 1000 * 60),
    description: 'Test1',
  }),
  new Course({
    id: '2',
    title: 'Video Course 2',
    duration: 32,
    creationDate: new Date(),
    description: 'Test2',
  }),
  new Course({
    id: '3',
    title: 'Video Course 3',
    duration: 33,
    creationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    description: 'Test3',
  }),
];

@Component({
  template: `
  <div [appReleaseBorder]="courses[0].creationDate">Blue Border</div>
  <div [appReleaseBorder]="courses[1].creationDate">Green Border</div>
  <div [appReleaseBorder]="courses[2].creationDate">Black Border</div>
  `,
})
class TestComponent {
  public courses: Course[] = testCourses;
}

describe('ReleaseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dirElements: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReleaseBorderDirective,
        TestComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    dirElements = fixture.debugElement.queryAll(By.directive(ReleaseBorderDirective));
    fixture.detectChanges();
  });

  it('should have three border colored elements', () => {
    expect(dirElements.length).toBe(3);
  });

  it('should color 1st <div> border w/ "blue"', () => {
    const borderColor = dirElements[0].nativeElement.style.borderColor;
    expect(borderColor).toBe('blue');
  });

  it('should color 2nd <div> border w/ "green"', () => {
    const borderColor = dirElements[1].nativeElement.style.borderColor;
    expect(borderColor).toBe('green');
  });

  it('should color 3rd <div> border w/ "black"', () => {
    const borderColor = dirElements[2].nativeElement.style.borderColor;
    expect(borderColor).toBe('black');
  });

});
