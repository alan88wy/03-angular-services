import { CoursesService } from './../services/courses.service';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation,
    Inject,
    Attribute,
    ChangeDetectionStrategy
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

// 5. No longer need the token if we use useClass
// import { COURSES_SERVICE } from '../app.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
    // OnPush will have better performance
    //
    // OnPush strategy will not check the unnecessary
    // dirty checking in ChildComponent and it’s child component ,GrandChildComponent, after applying
    // the ChangeDetectionStrategy.onPush strategy. It will make the component faster.
    //
    // By default, when a state value in component is changed, Angular updates all child component to
    // sync the value between view and component for all time.
    //
    // It will update all component view from top to bottom, whenever an event is triggered( eg. XHR,
    // promise, user events) of any component. This unnecessary change detection checking leads to
    // performance issue when you are working with large project or handling large data.
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    // 1. Original
    // constructor() {

    // 2. Need to add this if we use our own provider
    //    constructor(@Inject(COURSES_SERVICE) private coursesServices: CoursesService) {

    // 3. We use classname CoursesServices in app.component.ts instead
    //    of Injection Token and it still works
    //    constructor(private coursesServices: CoursesService) {
    //
    //    Can use @Self() before declaring the services if you
    //    only want to use service created by this component in the
    //    providers: [] clause on top
    //
    //    Or use @SkipSelf() to make sure the component only uses
    //    the component injection by parent component.
    //
    // 4. Back to original

    // 10. Angular Attribute
    constructor(@Attribute('type') private type: string) {
      console.log('type : ', type)

    }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }


    OnTitleChange(newTitle: string) {
      this.course.description = newTitle;
    }

}
