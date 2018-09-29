import {Component, OnInit} from '@angular/core';
import {concat, of} from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    const stream$1 = of(1, 2, 3);
    const stream$2 = of(4, 5, 6);
    const stream$3 = of(7, 8, 9);


    concat(stream$1, stream$2, stream$3)
      .subscribe(
        console.log,
        console.log,
        () => console.log('complete')
      );
  }
}
