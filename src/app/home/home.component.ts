import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, throwError, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advanceCourses$: Observable<Course[]>;

  ngOnInit() {
    const http$ = createHttpObservable('api/courses');


    const courses$: Observable<Course[]> = http$.pipe(
      catchError(err => {
        console.log(`Error was catch ${err}`);

        return throwError(err);
      }),
      map(res => res.payload),
      shareReplay(),
      retryWhen(errors => {
        return errors.pipe(
          // delay(2000) // difference between delay and delayWhen in particular case is unclear
         delayWhen( () => timer(2000))
        );
      })
    );

    const byType = type => (arr, i) => arr.filter(item => item.category === type);


    this.beginnerCourses$ = courses$.pipe(
      map(byType('BEGINNER'))
    );

    this.advanceCourses$ = courses$.pipe(
      map(byType('ADVANCED'))
    );

  }

}
