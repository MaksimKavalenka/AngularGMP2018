import { Component, Input, forwardRef, Inject, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { Author } from '../../entities/author';
import { IAuthorService } from '../../services/author/author.service';
import { DefaultControlValueAccessor } from '../../../common/entities/controlValueAccessor';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsComponent),
    multi: true,
  }],
})
export class AuthorsComponent extends DefaultControlValueAccessor implements OnInit {

  public authors: Observable<Author[]>;

  @Input()
  public appMinAuthors: number;

  public constructor(
    @Inject('authorService') private authorService: IAuthorService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.authors = this.authorService.getAllAuthors();
  }

}
