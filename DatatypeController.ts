
export interface myDataSet {
}


export default class DatatypeController {
    public courses_dept: string;
    public courses_id: string ;
    public courses_avg: number ;
    public courses_instructor: string;
    public courses_title: string;
    public courses_pass: number ;
    public courses_fail: number;
    public courses_audit: number ;

    constructor() {

        this.courses_dept = null;
        this.courses_id = null;
        this.courses_avg = null;
        this.courses_instructor = null;
        this.courses_title = null;
        this.courses_pass = null;
        this.courses_fail = null;
        this.courses_audit = null;

    }
    public setcourses_dept(dept: string) {
    this.courses_dept=dept;
    }

    public setcourses_id(id: string) {
        this.courses_id=id;
    }


    public setcourses_avg(avg: number) {
        this.courses_avg=avg;
    }


    public setcourses_instructor(instructor: string) {
        this.courses_instructor=instructor;
    }


    public setcourses_title(title: string) {
        this.courses_title=title;
    }


    public setcourses_pass(pass: number) {
        this.courses_pass=pass;
    }


    public setcourses_fail(fail: number) {
        this.courses_fail=fail;
    }

    public setcourses_audit(audit: number) {
        this.courses_audit=audit;
    }

    public getcourses_dept():string {
         return this.courses_dept; 
    }  
    public getcourses_id():string {     return this.courses_id; }   
    public getcourses_avg():number {     return this.courses_avg; }
       public getcourses_instructor():string { return this.courses_instructor; }   
    public getcourses_title():string {     return this.courses_title; }   
    public getcourses_pass():number {     return this.courses_pass; }
       public getcourses_fail():number {     return this.courses_fail; }  
    public getcourses_audit():number {     return this.courses_audit; }

}