import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses: Course[];
  advanceCourses: Course[];

  ngOnInit() {
    const http$ = createHttpObservable('api/courses');


    const courses$ = http$.pipe(
      map(res => res.payload)
    );

    const byType = type => (item, i, ar) => item.category === type;

    courses$
      .subscribe(
        response => {
          this.beginnerCourses = response.filter(byType('BEGINNER'));
          this.advanceCourses = response.filter(byType('ADVANCED'));
        },
        noop,
        () => console.log('completed')
      );


  }

}
