import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Schedule } from './interfaces/schedule';

export interface Toast {
  isShow : boolean;
  toastText: string;
  toastStatus: 'success'|'warning'|'error';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // 맴버변수 정의 
  // @ViewChild(탐색 대상 클래스명) 프로퍼티명 : 탐색 대상 클래스명;
  // 부모 Component template 안에 위치한 모든 자식 요소들을 ViewChild라고 한다
  // 자식 component 객체에 직접 접근하려면 @ViewChild decorator를 이용해야 한다
  @ViewChild('todoInput') todoInput!: ElementRef;
  
  schedules: Schedule[] = [];

  // 토스트 관련 상태들
  toast: Toast = {
    isShow: false,
    toastStatus: 'success',
    toastText: ''
  }

  // 생성자 정의
  constructor() {}

  // 앵귤러 생명주기 함수 정의
  ngOnInit(): void {
    console.log('app component 초기화! 확인용')
  }

  // 사용자정의 메서드 정의
  onCreate(element: HTMLInputElement){
   console.log(element.value);
   
    this.schedules.push({
    id: this.schedules.length,
    text : element.value
   });

    element.value ='';

    this.onToast('일정을 생성하였습니다', 'success');
  }

  onUpdate(willUpdateSchedule : Schedule){
    const result = window.prompt('내용을 수정해주세요', willUpdateSchedule.text);
    // 사용자가 취소버튼을 눌렀을때 함수 종료
    if(!result){
      return;
    }
    // 기존에 작성된 내용과 수정된 내용이 변동사항이 없을 때 그냥 함수 종료
     if(willUpdateSchedule.text === result){
      return;
    }

    this.schedules = this.schedules.map((schedule) =>{
      if(schedule.id === willUpdateSchedule.id){
        return{
          id : schedule.id,
          text :result
        }
      }
      return schedule;
    });
    
    this.onToast('일정을 변경하였습니다', 'success');
  }

  onDelete(id : number){
    console.log(id);
    this.schedules = this.schedules.filter(schedule => schedule.id !== id);
    this.onToast('삭제에 실패하였습니다', 'error');
  }

  private onToggle() {
    this.toast = {
      ...this.toast,
      isShow: true
    };
    setTimeout(() => {
      this.toast = {
        ...this.toast,
        isShow: false
      };
    }, 3000);
  }

  private onToast(text: string, status: 'success'|'warning'|'error') {
    this.onToggle();

    this.toast = {
      ...this.toast,
      toastText: text,
      toastStatus: status
    };
  }
}
