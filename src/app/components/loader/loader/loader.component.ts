import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  // animations: [
  //   trigger('visibility', [
  //     state('shown', style({ transform: 'scale(1.0)', opacity: 1 })),
  //     state('hidden', style({ transform: 'scale(0.5)', opacity: 0 })),
  //     transition('* => *', animate('0.5s ease-in-out')),
  //   ]),
  // ],
})
export class LoaderComponent implements OnInit {

  public isBeingLoaded = false;
  // public visibility = 'hidden';

  public constructor(
    private loaderService: LoaderService,
  ) { }

  public ngOnInit() {
    this.loaderService.loaderObservable.subscribe((isBeingLoaded) => {
      this.isBeingLoaded = isBeingLoaded;
      // this.visibility = isBeingLoaded ? 'shown' : 'hidden';
    });
  }

}
