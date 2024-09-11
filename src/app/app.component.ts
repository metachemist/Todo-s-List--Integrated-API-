import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './Model/task';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  taskObj: Task = new Task()
  taskList: ITask[] = [];
  masterservice = inject(MasterService);
  ngOnInit(): void {
    this.loadAllTask();
  }
  loadAllTask() {
    this.masterservice.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
    })
  }
  addTask(){
    this.masterservice.addNewTask(this.taskObj).subscribe((res: ApiResponseModel)=>{
      if(res.result){
        alert('Task Created Success')
        this.loadAllTask();
        this.taskObj = new Task();
      }
    }, error =>{
      alert('API Call Error')
    })
  }

  updateTask(){
    this.masterservice.updateTask(this.taskObj).subscribe((res: ApiResponseModel)=>{
      if(res.result){
        alert('Task Updated Success')
        this.loadAllTask();
        this.taskObj = new Task();
      }
    }, error =>{
      alert('API Call Error')
    })
  }

onDelete(id:number){
  const isConfrim = confirm("Are you sure want to Delete");
  if(isConfrim){
    this.masterservice.deleteTask(id).subscribe((res: ApiResponseModel)=>{
      if(res.result){
        alert('Task Deleted Success')
        this.loadAllTask();
        this.taskObj = new Task();
      }
    }, error =>{
      alert('API Call Error')
    })
  }


}

  onEdit(item: Task){
    this.taskObj = item;
    setTimeout(()=>{
      const dat = new Date(this.taskObj.dueDate)
      const day = ('0' + dat.getDate()).slice(-2)
      const month = ('0' + dat.getMonth() + 1).slice(-2)
      const today = dat.getFullYear() + '-' + (month) + '-' + (day);

      (<HTMLInputElement>document.getElementById('textDate')).value = today
      // const dateField = document.getElementById('textDate')
      // if(dateField!= null){
      //   dateField.['value']=today
      // }

    }, 1000)
  }
}
