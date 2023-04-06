import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CourseCardComponent } from './course-card/course-card.component';
// import { CourseImageComponent } from './course-image/course-image.component';
// import { HighlightedDirective } from './courses/directives/highlighted.directive';
// import { NgxUnlessDirective } from './courses/directives/ngx-unless.directive';
// import {HttpClientModule} from '@angular/common/http';
import { CoursesModule } from './courses/courses.module';
import { HttpClientModule } from '@angular/common/http';
// import { CoursesService } from './courses/services/courses.service';

@NgModule({
  declarations: [
    AppComponent,
    // CourseCardComponent,
    // CourseImageComponent,
    // HighlightedDirective,
    // NgxUnlessDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoursesModule
  ],
  providers: [
    // CoursesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
