import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { ListComponent } from 'src/app/list/list.component';
import { GraphqlService } from '../graphql.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  toggleFlag:boolean=true;
  tableHeaders = [
    "Ref",
    "Name",
    "Description",
    "Est in Hrs",
    "endDate",
   
    "Status",
    "@"
  ];

  stuffs: any;
  TaskRef :any;
  TaskName : String;
  TaskDetail : String;
  DurationTask :any;
  endDate :any;
  Task_Status:any;

  NewStuffs = [];

  S_TaskRef :any;
  S_TaskName : String;
  S_TaskDetail : String;
  S_DurationTask :any;
  S_endDate :any;
  S_Task_Status:any;

 

  constructor(private location: Location, private graphqlService: GraphqlService,private fb:FormBuilder, private httpService: HttpService) { 



  }
  ngOnInit() { }

  onAdd(){
    this.TaskName;
    this.TaskDetail;

  
    let subtasks= [
      {
        id:this.NewStuffs[0].S_TaskRef,
        taskname: this.NewStuffs[0].S_TaskName,
        description: this.NewStuffs[0].S_TaskDetail
        }
    ]

    let taskdata = [{
      id : this.TaskRef,
      taskname : this.TaskName,
      description : this.TaskDetail,
      status : this.Task_Status,
      duration : this.DurationTask,
      end:this.endDate,
      'subtasks':subtasks
        }]


       


    this.graphqlService.Add_New_Task(taskdata).subscribe(result => {
      console.log('CHECK'+JSON.stringify(result));
     window.location.reload();
    });
  }


  pageRefresh() {
    console.log('XXX');
    
    location.reload();
 }

 onAdd_New() {
   if(this.NewStuffs.length>0)
   console.log('dsf');
   else
  this.NewStuffs.push( {S_TaskRef: this.S_TaskRef, S_TaskName: this.S_TaskName,S_TaskDetail: this.S_TaskDetail, S_DurationTask: this.S_DurationTask } );
}

onLesserAmountOfNewRows(index){
  console.log(index);
  this.NewStuffs.splice(index, 1);
}

UpdateTaskStatus() {
  this.toggleFlag=!this.toggleFlag;
  if(this.toggleFlag)
     console.log('toggle case 1');  
  else
     console.log('toggle case 2');  
}



}
