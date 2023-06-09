import { CONFIG_TOKEN, APP_CONFIG, AppConfig } from './config';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Injectable, InjectionToken, Inject, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, Injector } from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
// import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './courses/directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './courses/services/courses.service';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';

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
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//     {
//       provide: CONFIG_TOKEN,
//       useFactory: () => APP_CONFIG
//     }
//   ]
// })

// 7. We can use useValue instead
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [
//     {
//       provide: CONFIG_TOKEN,
//       useValue: APP_CONFIG
//     }
//   ]
// })
//
// 8.Let's make it tree shakable
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// export class AppComponent implements OnInit {

// 10. Let's implement doCheck here
export class AppComponent implements OnInit, DoCheck {

  // Can also use observerable
  // We will remove this for now and use subscribe in OnInit
  // courses$ : Observable<Course[]>;

  // courses = COURSES;
  courses: Course[];

  coursesTotal: number;

  // 10. use by doCheck
  loaded = false;

  // constructor(private http: HttpClient, private coursesService: CoursesService) {
  // constructor(private coursesService: CoursesService) {

  // If we create our own provider, we need to put in the @Inject here
  // constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {

  // use Class name CoursesService instead of token
  // constructor(
  //   private coursesService: CoursesService,
  //   @Inject(CONFIG_TOKEN) private config: AppConfig
  //   ) {
  //     console.log(config)
  // }

  //  7. Even if we do not inject the APP_CONFIG here, it will still
  //     works because of the provider clause above. It will still be
  //     injected in the application bundle
  // constructor(
  //   private coursesService: CoursesService
  //   ) {

  // }

  // 8. Three Shakal providers.
  //    After removing the provider, if we need APP_CONFIG
  //    we can do this. Otherwise the config will not be injected
  //    into the code:
  constructor(
    // Constructor is call before anything else including  @Input
    // It takes dependency injection

    private coursesService: CoursesService,
    // 9. Using change detector
    private cd: ChangeDetectorRef,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private injector: Injector
    ) {
      console.log(config)
  }

  // 10. DoCheck is useful if we want to do customer check
  ngDoCheck(): void {
    if (this.loaded) {
      this.cd.markForCheck();
    }
  }

  ngOnInit() {

    const htmlElement = createCustomElement(CourseTitleComponent, {injector: this.injector});

    customElements.define('course-title', htmlElement)
    // ngOnInit is call after constructor is called and after @Input

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
    // this.courses$ = this.coursesService.loadCourses();
    // use subscribe instead
    this.coursesService.loadCourses()
        .subscribe (
          courses => {
            this.courses = courses;
            this.coursesTotal = courses.length;
            // 9. Using change detector
            // 10. We do this at doCheck instead
            // this.cd.markForCheck();
            this.loaded = true;
          }
        )
  }



  save(course: Course) {
    this.coursesService.saveCourse(course)
    .subscribe (
      () => console.log("Course Saved !")
    );
  }

  onEditCourse() {

    // console.log("here")
    const course = this.courses[0];
    const newCourse = {...course};

    newCourse.description = "new Value !"

    this.courses[0] = newCourse;

    this.courses[0].description = "New Value !"
  }

}
