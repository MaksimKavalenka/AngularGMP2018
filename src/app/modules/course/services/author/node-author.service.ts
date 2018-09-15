import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';

import { IAuthorService } from './author.service';
import { Author } from '../../entities/author';
import { RxJsUtils } from '../../../../utils/rxjs-utils';

@Injectable()
export class NodeAuthorService implements IAuthorService {

  private static readonly AUTHORS_URL = 'http://localhost:3004/authors';

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public constructor(
    private http: HttpClient,
  ) {
    this.loaderObservable = this.loaderSubject.asObservable();
  }

  public getAuthor(id: string): Observable<Author> {
    const observable = this.http.get<Author>(`${NodeAuthorService.AUTHORS_URL}/${id}`);
    const handlerFunc = response => new Author(response);
    return RxJsUtils.createObservable<Author, Author>(observable, handlerFunc, this.loaderSubject);
  }

  public getAuthors(start: number, limit: number, searchQuery?: string, sort?: Sort): Observable<Author[]> {
    let url = `${NodeAuthorService.AUTHORS_URL}?start=${start}&limit=${limit}`;
    if (searchQuery) {
      url += `&textFragment=${searchQuery}`;
    }
    if (sort) {
      url += `&sort=${sort.active}&order=${sort.direction}`;
    }

    const observable = this.http.get<Author[]>(url);
    const handlerFunc = response => response.map(author => new Author(author));
    return RxJsUtils.createObservable<Author[], Author[]>(observable, handlerFunc, this.loaderSubject);
  }

  public getAllAuthors(): Observable<Author[]> {
    const observable = this.http.get<Author[]>(NodeAuthorService.AUTHORS_URL);
    const handlerFunc = response => response.map(author => new Author(author));
    return RxJsUtils.createObservable<Author[], Author[]>(observable, handlerFunc, this.loaderSubject);
  }

}
