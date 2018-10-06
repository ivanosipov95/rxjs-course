import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
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
      shareReplay()
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
