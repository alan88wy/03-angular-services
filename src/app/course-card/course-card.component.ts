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
    Inject
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

// 5. No longer need the token if we use useClass
// import { COURSES_SERVICE } from '../app.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
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
    // constructor(private coursesServices: CoursesService) {

    // 4. Back to original

    constructor() {

    }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
