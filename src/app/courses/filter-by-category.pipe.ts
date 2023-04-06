// Custom Pipe

import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

@Pipe({
    name: 'filterByCategory',
    pure: false, // Change pure pipe to non-pure pipe to ensure this will be call whenever the view data is changed.
                 // Be aware that this is potentially an expensive operation. So, use with care.
})
export class FilterByCategoryPipe implements PipeTransform  {

  transform(courses: Course[], category:string) {
    return courses.filter(c => c.category === category);
  }

}
