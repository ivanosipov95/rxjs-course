import {Component, OnInit} from '@angular/core';
import {concat, interval, merge, of} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    // const stream$1 = of(1, 2, 3);
    // const stream$2 = of(4, 5, 6);
    // const stream$3 = of(7, 8, 9);
    //
    //
    // concat(stream$1, stream$2, stream$3)
    //   .subscribe(
    //     console.log,
    //     console.log,
    //     () => console.log('complete')
    //   );


    // const stream1$ = interval(1000).pipe(mapTo('first'));
    // const stream2$ = interval(500). pipe(mapTo('second'));
    //
    //
    // merge(stream1$, stream2$)
    //   .subscribe(console.log);

    // const interval1$ = interval(1000);
    //
    // const sub = interval1$.subscribe(console.log);
    //
    // setTimeout(() => sub.unsubscribe(), 5000);


    // const http$ = createHttpObservable('api/courses');
    //
    // const sub = http$.subscribe(console.log);
    //
    // setTimeout(() => sub.unsubscribe(), 0);
  }
}
