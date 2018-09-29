import {Observable} from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  return Observable.create(observer => {
    fetch(url)
      .then(res => res.json())
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}

