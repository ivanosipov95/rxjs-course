import {Component, OnInit} from '@angular/core';
import {noop} from 'rxjs';
import {map} from 'rxjs/operators';
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

    // document.addEventListener('click', () => {
    //   console.log('click');
    //
    //   setTimeout(() => {
    //     console.log('timeout');
    //
    //
    //     let counter = 0;
    //
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //
    //   }, 3000);
    //
    // });


    // const interval$ = interval(1000);
    //
    // interval$.subscribe(v => console.log(`stream 1 => ${v}`));
    // interval$.subscribe(v => console.log(`stream 2 => ${v}`));

    // const interval$ = timer(3000, 1000);
    //
    // const sub = interval$.subscribe(
    //   v => console.log(`stream 1 => ${v}`),
    //   err => console.log(err),
    //   () => console.log('completed')
    // );
    //
    // setTimeout(() => sub.unsubscribe(), 5000);
    //
    //
    // const click$ = fromEvent(document, 'click');
    //
    // click$.subscribe(
    //   evt => console.log(evt),
    //   err => console.log(err),
    //   () => console.log('complete')
    // );


    const http$ = createHttpObservable('api/courses');


    const courses$ = http$.pipe(
      map(res => res.payload)
    );

    courses$
      .subscribe(
        response => console.log(response),
        noop,
        () => console.log('completed')
      );
  }
}
