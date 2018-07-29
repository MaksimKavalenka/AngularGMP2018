import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {

  public title: string;

  public constructor(
    private routerService: EventService,
  ) { }

  public ngOnInit() {
    this.routerService.data.subscribe((data) => {
      if (data) {
        this.title = data.title;
      } else {
        this.title = '';
      }
    });
  }

}
