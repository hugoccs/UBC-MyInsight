/**
 * Created by rtholmes on 2016-06-19.
 */

import {Datasets} from "./DatasetController";
import Log from "../Util";
import DatatypeController from "./DatatypeController";
export interface QueryRequest {
    GET: string|string[];
    WHERE: {};
    ORDER: string;
    AS: string;
}

export interface QueryResponse {
   // DATASET?:Datasets;
    //RESULT?:string;
}

export default class QueryController {
    private datasets: Datasets = null;

    constructor(datasets: Datasets) {
        this.datasets = datasets;
    }

    public isValid(query: QueryRequest): boolean {
        if (typeof query !== 'undefined' && query !== null && Object.keys(query).length > 0) {
            return true;
        }
        return false;
    }

    public query(query: QueryRequest): QueryResponse {
        Log.trace('QueryController::query( ' + JSON.stringify(query) + ' )');
        let resp: QueryResponse={};
        // TODO: implement this
            //console.log(query.GET.length);
           //console.log(typeof (query.GET));


            //console.log(temp.result);







        //resp.RESULT=this.getStr(query.GET).toString;


       let a= this.getStr(query.GET);

        console.log(a);
        

        return {status: 'received', ts: new Date().getTime()};
        //return {status: 'received', ts: new Date().getTime()};
    }

    private  getData(str: string):any {
        let resultArray=new Array;
        switch (str){
            case 'courses_dept': {
                let result=new DatatypeController;
               for (let aCouse of this.datasets['courses'].result){

                       result.setcourses_dept(aCouse.courses_dept);
                       resultArray.push(result);

               }
            break;
            }
            case'courses_id': {
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_id(aCouse.getcourses_id());
                    resultArray.push(result);
                }
                break;
            }
            case'courses_avg':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_avg(aCouse.getcourses_avg());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_instructor':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_instructor(aCouse.getcourses_instructor());
                    resultArray.push(result);
                }
                break;
            }
            case'courses_title':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_title(aCouse.getcourses_title());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_pass':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_pass(aCouse.getcourses_pass());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_fail':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_fail(aCouse.getcourses_fail());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_audit':{
                let result=new DatatypeController;
                for (let aCouse of this.datasets['courses'].result){
                    result.setcourses_audit(aCouse.getcourses_audit());
                    resultArray.push(result);
                }
                break;
            }
        };
        return resultArray;
    }
    private  getDataArray(strArray: string[]):any {
        let resultArray=new Array;
        for (let aCouse of this.datasets['courses'].result) {
            let result = new DatatypeController;
            for (let str of strArray) {
                switch (str){ 
                    case 'courses_dept': {  for (let aCouse of this.datasets['courses'].result){ result.setcourses_dept(aCouse.getcourses_dept());} break; } 
                    case'courses_id': { for (let aCouse of this.datasets['courses'].result){ result.setcourses_id(aCouse.getcourses_id()); } break; } 
                    case'courses_avg':{ for (let aCouse of this.datasets['courses'].result){ result.setcourses_avg(aCouse.getcourses_avg()); } break; } 
                    case 'courses_instructor':{ for (let aCouse of this.datasets['courses'].result){ result.setcourses_instructor(aCouse.getcourses_instructor()); } break; } 
                    case'courses_title':{for (let aCouse of this.datasets['courses'].result){ result.setcourses_title(aCouse.getcourses_title()); }break; } 
                    case 'courses_pass':{ for (let aCouse of this.datasets['courses'].result){ result.setcourses_pass(aCouse.getcourses_pass()); } break; } 
                    case 'courses_fail':{ for (let aCouse of this.datasets['courses'].result){ result.setcourses_fail(aCouse.getcourses_fail()); } break; } 
                    case 'courses_audit':{ for (let aCouse of this.datasets['courses'].result){result.setcourses_audit(aCouse.getcourses_audit()); } break; }
                     };
            }
            resultArray.push(result);
        }
        return resultArray;
    }

    private  getStr(str: string|string[]):any {

        if(typeof (str)==="string") {
           return this.getData(str.toString());
        }
        else if(str.constructor === Array){
            let strArray:string[]=str;
            return this.getDataArray(strArray);
    }else return{status: 'Get error'};

    }





}
