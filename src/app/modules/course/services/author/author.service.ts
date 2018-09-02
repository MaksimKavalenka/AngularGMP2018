import { Sort } from '@angular/material';
import { Observable } from 'rxjs';

import { Author } from '../../entities/author';
import { ILoaderService } from '../../../../services/loader/loader.service';

export interface IAuthorService extends ILoaderService {
  getAuthor(id: string): Observable<Author>;
  getAuthors(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Author[]>;
  getAllAuthors(): Observable<Author[]>;
}
