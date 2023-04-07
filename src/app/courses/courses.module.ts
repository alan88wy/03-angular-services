import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './services/courses.service';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { FilterByCategoryPipe } from './filter-by-category.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    FilterByCategoryPipe,
  ],
  exports: [
    // Need to export these components, otherwise app.component.ts will not see them
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe
  ],
  providers: [
    CoursesService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesModule { }
