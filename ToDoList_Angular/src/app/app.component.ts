import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { scheduled } from 'rxjs';

export interface Schedule {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * schedules 라는 변수에 Schedule 배열형태의 객체를 배열로 담을 것이다
   */
  schedules: Schedule[] = []

  ngOnInit(): void {
    console.log('reset')
  }

  /**
   * push({})
   * @param element : 입력받은 input 값 
   */
  onCreate(element: HTMLInputElement) {
    console.log(element.value)

    this.schedules.push({
      id: this.schedules.length,
      text: element.value
    });

    element.value = ''; // 입력창 초기화 
  }

  /**
   * if(!result) : 만약에 결과가 다르다면 리턴해주고 
   * else if(updateSchedule.text === result) : 수정한 내용과 결과가 같다면
   * map(()=>{}) : 
   */
  onUpdate(updateSchedule: Schedule) {
    const result = window.prompt('내용을 수정해주세요', updateSchedule.text);

    if(!result){
      return;
    }

    if(updateSchedule.text === result){
      return;
    }
    
    this.schedules = this.schedules.map((schedule) =>{
      if(schedule.id === updateSchedule.id){
        return{
          id: schedule.id,
          text: result
        }
      }
      return schedule;
    })
  }

  /**
   * filter()
   * 
   */
  onDelete(id: number) {
   console.log(id)
   this.schedules = this.schedules.filter( todo => todo.id !== id );
  }
}
