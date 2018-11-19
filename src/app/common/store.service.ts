import {BehaviorSubject, Observable, timer} from 'rxjs';
import {Course} from '../model/course';
import {delayWhen, filter, filter, map, retryWhen, shareReplay, subscribeOn, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {createHttpObservable} from './util';
import {fromPromise} from 'rxjs/internal-compatibility';

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
    return this.fetchCoursesByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.fetchCoursesByCategory('ADVANCED');
  }


  saveCourse(courseId, changes): Observable<any> {
    const courses = this.subject.getValue();

    const courseIndex = courses.findIndex(course => course.id === courseId);

    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    };

    this.subject.next(newCourses);

    return fromPromise(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === +courseId)),
      filter(course => !!course)
    );
  }

  private fetchCoursesByCategory(category: string): Observable<Course[]> {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === category))
      );
  }
}
