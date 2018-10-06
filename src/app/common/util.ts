import {Observable} from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal})
      .then(handleErrors)
      .then(res => res.json())
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}

function handleErrors(res) {
  if (!res.ok) {
    throw 'request is failed';
  }

  return res;
}

