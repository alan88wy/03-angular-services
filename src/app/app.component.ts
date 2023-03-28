import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Can also use observerable
  courses$ : Observable<Course[]>;

  // courses = {};

  // constructor(private http: HttpClient, private coursesService: CoursesService) {
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