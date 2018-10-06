import {BehaviorSubject, Observable, timer} from 'rxjs';
import {Course} from '../model/course';
import {delayWhen, map, retryWhen, shareReplay, subscribeOn, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {createHttpObservable} from './util';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {

    const http$ = createHttpObservable('/api/courses')
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload']))
      )
      .subscribe(courses => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'BEGINNER'))
      );
  }

  selectAdvancedCourses() {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'ADVANCED'))
      );
  }
}
