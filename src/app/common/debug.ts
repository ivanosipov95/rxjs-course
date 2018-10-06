import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export enum RxJSLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let rxJsloggingLevel = RxJSLoggingLevel.INFO;


export const setLevel = (level: RxJSLoggingLevel) => rxJsloggingLevel = level;

export const debug = (level: number, message: string) => {
  return (source: Observable<any>) => {
    return source.pipe(
      tap(val => {
        if (rxJsloggingLevel >= level) {
          console.log(`${message}:`, val);
        }
      })
    );
  };
};
