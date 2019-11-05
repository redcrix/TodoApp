import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { GraphqlService } from 'src/app/graphql.service';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  loading = false;
  showMsg: boolean;
  toggleFlag:boolean=true;
  NewSubTask:boolean = false;
  newSubTasksCounts:[];
  tableHeaders = [
    "Ref",
    "Name",
    "Description",
    "Duration (In Hours)",
    "Comments",
    "Status"
  ]
  http: any;
  stuffs: any;
  TaskRef :any;
  TaskName : String;
  TaskDetail : String;
  DurationTask :any;
  CommentTask :any;
  openformid: any;
  public id: number;
  public name: string;
  public year: number;

  constructor(private httpService: HttpService,private graphqlService:GraphqlService) {
  }

  ngOnInit() {
  this.reloadData();
  }
;
  reloadData() {
    this.loading = true;
    console.log("reloadData");
    this.stuffs = [];
    this.graphqlService.get_AllTasks().subscribe(result => {
      this.stuffs=result.data['findTask'];
      this.loading = false;
      console.log(this.stuffs);
      
    });
  }

  onAdd(){
    console.log(document.getElementById("TaskRef"));
    this.TaskName;
    this.TaskDetail;

    let data = {
      ref : this.TaskRef,
      name : this.TaskName,
      detail : this.TaskDetail,
      status : this.toggleFlag,
      duration : this.DurationTask,
      comments:this.CommentTask

    }
    this.graphqlService.Add_New_Task(data, []).subscribe(result => {
      console.log('CHECK'+JSON.stringify(result));
      // this.reloadData();
      // this.ngOnInit();
      window.location.reload();
    });
  }

  onUpdate(){
console.log(this.stuffs.id);
    let data = {
      ref : this.stuffs.id,
      name : this.TaskName,
      detail : this.TaskDetail,
      status : this.toggleFlag,
      duration : this.DurationTask,
      comments:this.CommentTask

    }
    console.log(data);
    this.graphqlService.Add_New_Task(data, []).subscribe(result => {
      console.log('CHECK'+JSON.stringify(result));
      // this.reloadData();
      // this.ngOnInit();
      window.location.reload();
    });

    

  }

    onAddSubtask(){
      console.log(this.TaskRef);
      this.TaskName;
      this.TaskDetail;
  
      let data = {
        ref : this.TaskRef,
        name : this.TaskName,
        detail : this.TaskDetail,
        status : this.toggleFlag,
        duration : this.DurationTask,
        comments:this.CommentTask
    }
  }
   
  

  onDelete(id_) {
    // console.log('New ======'+id_);
    // console.log('New ID======'+id_.hypi.id);

    this.graphqlService.delete_Task(id_).subscribe(result => {
   
      console.log('CHECK'+JSON.stringify(result));
      
    });
    
      // this.stuffs.splice(id_, 1);
      this.showMsg = true;
      this.loading = false;
      window.location.reload();

  }
 
  UpdateTaskStatus() {
    this.toggleFlag=!this.toggleFlag;
    if(this.toggleFlag)
       console.log('toggle case 1');  
    else
       console.log('toggle case 2');  
  }

  onAddSubTask(i){
    this.NewSubTask = true;
    // this.newSubTasksCounts=i;
  }
  ShowComments(){

  }

  onEdit(id_){

    this.openformid=id_;
    
  }
  buttonClicked() {
    this.stuffs.push( {id: this.id, name: this.name, year: this.year } );

    //if you want to clear input
    this.id = null;
    this.name = null;
    this.year = null;
  }

  

  
  }





