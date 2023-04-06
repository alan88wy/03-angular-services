import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../../model/course';

// 1. Original
//
// @Injectable({
//   providedIn: 'root'
// })
//
// We are using our provided here
//
// 2. Using our own provider
// @Injectable()
// 3. Manually giving provider function
// @Injectable({
//   providedIn: 'root',
//   useFactory: (http: HttpClient) => new CoursesService(http),
//   deps: [ HttpClient]
// })

//  4. Can use useClass here as well
// @Injectable({
//   providedIn: 'root',
//   useClass: CoursesService,
// })

// 5. Will also work without it
@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  loadCourses(): Observable<Course[]> {
      const params = new HttpParams()
              .set("page", 1)
              .set("pageSize", 10)

      return this.http.get<Course[]>('/api/courses', { params });
  }

  saveCourse(course: Course) {

    const headers = new HttpHeaders()
                        .set("X-Auth", "userId");

    return this.http.put(`/api/courses/${course.id}`, course, { headers });

  }
}
