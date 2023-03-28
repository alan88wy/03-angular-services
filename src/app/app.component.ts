import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Injectable, InjectionToken, Inject } from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

// 2. Using factory function
// We don't normally need to create our own provider. It comes with Angular.
// Example provider in the courserServices.ts file:
//    @Injectable({
//        providedIn: 'root'
//    })
// function CoursesServiceProvider(http: HttpClient): CoursesService {
//   return new CoursesService(http)
// }

// export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');
//
// 2. Using factory Function
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//     {
//       provide: COURSES_SERVICE,
//       useFactory: CoursesServiceProvider,
//       deps: [ HttpClient]
//     }
//   ]
// })

// 3. Instead of using Injection Token, we can use the class name as well:

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//     {
//       provide: CoursesService,
//       useFactory: CoursesServiceProvider,
//       deps: [ HttpClient]
//     }
//   ]
// })

// 4. We can do this as well instead of the above
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//     {
//       provide: CoursesService,
//       useClass: CoursesService
//     }
//   ]
// })

// 5. Further Simplify:
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//       CoursesService
//   ]
// })

// 6. Back to original
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // Can also use observerable
  courses$ : Observable<Course[]>;

  // courses = {};

  // constructor(private http: HttpClient, private coursesService: CoursesService) {
  // constructor(private coursesService: CoursesService) {

  // If we create our own provider, we need to put in the @Inject here
  // constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {

  // use Class name CoursesService instead of token
  constructor(private coursesService: CoursesService) {

  }

  ngOnInit() {

    // const params = new HttpParams()
    //                 .set("page", 1)
    //                 .set("pageSize", 10)


    // this.http.get('/api/courses', { params })
    //         .subscribe(
    //           res => {
    //             this.courses = res
    //           }
    //         );

    // Using Observable. Implicitly subscribe to the http get
    // Making it easy for us to build component that is more reactive
    // this.courses$ = this.http.get<Course[]>('/api/courses', { params });

    // We use CourseService instead of doing the above
    this.courses$ = this.coursesService.loadCourses();
  }


  save(course: Course) {
    this.coursesService.saveCourse(course)
    .subscribe (
      () => console.log("Course Saved !")
    );
  }

}
