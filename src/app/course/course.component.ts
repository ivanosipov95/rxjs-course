import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  courseId: string;

  @ViewChild('searchInput') input: ElementRef;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(`api/courses/${this.courseId}`);
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent(this.input.nativeElement, 'input').pipe(
      throttleTime(400),
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      startWith(''),
      switchMap(search => this.loadLessons(search))
    );
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(`api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`).pipe(
      map(res => res.payload)
    );
  }


}
