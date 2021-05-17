/**
 * Created by rtholmes on 2016-09-03.
 */
import DatatypeController from "./DatatypeController";
import Log from "../Util";
import JSZip = require('jszip');
import fs = require('fs');
import forEach = require("core-js/fn/array/for-each");
/**
 * In memory representation of all datasets.
 */
export interface Datasets {
    [id: string]: {"result":DatatypeController[]};






}

export default class DatasetController {

    private datasets: Datasets = {};

    constructor() {
        Log.trace('DatasetController::init()');
    }

    /**
     * Returns the referenced dataset. If the dataset is not in memory, it should be
     * loaded from disk and put in memory. If it is not in disk, then it should return
     * null.
     *
     * @param id
     * @returns {{}}
     */
    public deleteDataset(id: string): Promise<boolean> {
        return new Promise(function (fulfill, reject) {
            try {
               // if (this.datasets.hasOwnProperty(id))
              //      this.datasets[id] = null;
                fs.stat('data/' + id + '.json', function (err, stat) {
                    if (err == null) {
                        fs.unlinkSync('data/' + id + '.json');
                        fulfill();
                    } else if (err.code == 'ENOENT') {
                        reject(err);
                        // dir does not exist
                        //fs.mkdirSync('data');
                    } else {
                        console.log('Some other error: ', err.code);
                        reject(err);
                    }
                });
                //this.datasets[id] = null;
               // reject();// there's a bug...
            } catch (err) {
                Log.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }

        });
    }
    public getDataset(id: string): any {
        // TODO: this should check if the dataset is on disk in ./data if it is not already in memory.
      if (this.datasets.hasOwnProperty(id))
          return this.datasets[id];

          this.getDatasets();
          if (this.datasets.hasOwnProperty(id))
              return this.datasets[id];
          return this.datasets;
    }

    public getDatasets(): Datasets {
        // TODO: if datasets is empty, load all dataset files in ./data from disk
        //this.datasets=

        let files = fs.readdirSync('./data');
        for (let item of files) {
            if (item.includes('.json')) {
                this.datasets[item.split('.')[0]]=JSON.parse(fs.readFileSync('data/'+item).toString());
                //console.log( this.datasets[item.split('.')[0]]);
            }
        }
//console.log(this.datasets);
        return this.datasets;
    }

    /**
     * Process the dataset; save it to disk when complete.
     *
     * @param id
     * @param data base64 representation of a zip file
     * @returns {Promise<boolean>} returns true if successful; false if the dataset was invalid (for whatever reason)
     */
    public process(id: string, data: any): Promise<boolean> {
        Log.trace('DatasetController::process( ' + id + '... )');
        //Log.trace(JSON.stringify(data));
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                let myZip = new JSZip();
                myZip.loadAsync(data, {base64: true}).then(function (zip: JSZip) {
                    Log.trace('DatasetController::process(..) - unzipped');
                    let processedDataset = {"result": [JSON]};
                    //console.log(typeof (processedDataset.result));
                    //console.log(Object.keys(processedDataset));
                    let allCourseArray = new Array;
                    let allCourseArrayPlain = new Array;
                    // TODO: iterate through files in zip (zip.files)

                    // The contents of the file will depend on the id provided. e.g.,
                    // some zips will contain .html files, some will contain .json files.
                    // You can depend on 'id' to differentiate how the zip should be handled,
                    // although you should still be tolerant to errors.

                    let promiseArray = new Array;
                    zip.folder("courses").forEach(function (relativePath, file) {
                        let promiseValue = file.async("string");
                        promiseArray.push(promiseValue);
                    });
                    that.creatDir();//create ./data dir
                    Promise.all(promiseArray).then(function (results) {
                            try
                            {
                                for (let element of results) {

                                    let aCourse = JSON.parse(element);

                                if (aCourse.result.length != 0)
                                    allCourseArray.push(aCourse.result);
                                //JSON.parse('[1, 2, 3, 4, ]');
                            }
                    } catch (err) {
                            Log.trace('DatasetController::process(promise.all) - ERROR: ' + err);
                            reject(err);
                        }
                            allCourseArrayPlain = that.mapToDataset(that.creatSimpleArray(allCourseArray));
                        if(allCourseArrayPlain.length<1)
                            reject("xx");

                           // let aaa=that.mapToDataset(allCourseArrayPlain)
                            /**
                             allCourseArray.forEach((element, index) => {
                                if (element.length != 0) {
                                    element.forEach((item:JSON,sec:number) => {
                                        //console.log(item.toString());
                                        allCourseArrayPlain.push(item);
                                    });
                                }
                                else {
                                    allCourseArrayPlain.push(element);
                                }
                            });
                             */
              //              var zipContent = 'UEsDBAoAAAAIAAEiJEm/nBg/EQAAAA8AAAALAAAAY29udGVudC5vYmqrVspOrVSyUipLzClNVaoFAFBLAQIUAAoAAAAIAAEiJEm/nBg/EQAAAA8AAAALAAAAAAAAAAAAAAAAAAAAAABjb250ZW50Lm9ialBLBQYAAAAAAQABADkAAAA6AAAAAAA=';
                //            var buf = new Buffer(zipContent, 'base64');
                  //          fs.writeFileSync('b.zip',buf);



                        processedDataset['result']=allCourseArrayPlain;
                            //processedDataset = {"result": allCourseArrayPlain};
                            that.save(id, processedDataset);

                            fulfill();

                        }
                        , reason => {
                            console.log(reason)
                        });
                }).catch(function (err) {
                    Log.trace('DatasetController::process(..) - unzip ERROR: ' + err.message);
                    reject(err);
                });
            } catch (err) {
                Log.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    }

    /**
     * Writes the processed dataset to disk as 'id.json'. The function should overwrite
     * any existing dataset with the same name.
     *
     * @param id
     * @param processedDataset
     */
    private save(id: string, processedDataset: any) {
        // add it to the memory model
        this.datasets[id] = processedDataset;
        // fs.mkdirSync('data');
        fs.writeFileSync('data/' + id + '.json', JSON.stringify(this.datasets[id]));
        // TODO: actually write to disk in the ./data directory
    }


    private creatDir() {

        fs.stat('data', function (err, stat) {
            if (err == null) {
                console.log('dir exists');
            } else if (err.code == 'ENOENT') {
                // dir does not exist
                fs.mkdirSync('data');
            } else {
                console.log('Some other error: ', err.code);
            }
        });

    }

    private creatSimpleArray(complexArray: any[]): JSON[] {

        let resultArray=new Array;

        complexArray.forEach((element, index) => {
            if (element.length != 0) {
                element.forEach((item: JSON, sec: number) => {
                    //console.log(item.toString());
                    resultArray.push(item);
                });
            }
            else {
                resultArray.push(element);
            }
        });
        return resultArray;
    }

    private mapToDataset(jsonArray:any[]):DatatypeController[]{
        let resultArray=new Array;
        for(let aCourse of jsonArray) {
            let myDataset=new DatatypeController;
            for (let key in aCourse) {
                switch (key){ 
                    case 'Subject': {         myDataset.setcourses_dept(aCourse['Subject']);break;     } 
                    case'Course': {          myDataset.setcourses_id(aCourse['Course']);break;     } 
                    case'Professor':{     myDataset.setcourses_instructor(aCourse['Professor']);break;     } 
                    case 'Title':{         myDataset.setcourses_title(aCourse['Title']);break;     } 
                    case'Avg':{         myDataset.setcourses_avg(aCourse['Avg']);break;     } 
                    case 'Pass':{         myDataset.setcourses_pass(aCourse['Pass']);break;     } 
                    case 'Fail':{         myDataset.setcourses_fail(aCourse['Fail']);break;     } 
                    case 'Audit':{         myDataset.setcourses_audit(aCourse['Audit']);break;     }
                     };
            }
            resultArray.push(myDataset);
        }
        return resultArray;
    }
















}
