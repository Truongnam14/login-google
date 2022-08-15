import { ToDo } from 'src/model/note.model';
import { ToDoState } from 'src/states/note.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ToDoActions from 'src/actions/note.actions';
import { Observable } from 'rxjs';
import { AuthState } from 'src/states/auth.state';
import * as AuthActions from 'src/actions/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toDoList_firebase_3';

  idToken$ = this.store.select((state)=>state.auth.idToken);

  updateCard: ToDo = {
    id: '',
    title: '',
    description: '',
    status: false,
    dateCreated: '',
  };
  
  currentCard: ToDo = {
    id: '',
    title: '',
    description: '',
    status: false,
    dateCreated: ''
  };
  toDoState$: Observable<ToDoState> = this.store.select('toDo');
  task$ = this.store.select(state => state.toDo.toDos);
  constructor(private store: Store<{toDo: ToDoState,auth: AuthState}>) { }
  
  ngOnInit(): void {
    this.toDoState$.subscribe(state => {
      console.log(state);
    });

    this.store.dispatch(ToDoActions.getAll());
  }

  addToDo(): void {
    this.currentCard.id = Date.now().toString();
    this.currentCard.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.addToDo({task: this.currentCard}));
    this.currentCard = {
      id: '',
      title: '',
      description: '',
      status: false,
      dateCreated: ''
    }
  }

  deleteToDo(id: string): void {
    this.store.dispatch(ToDoActions.deleteToDo({id: id}));
  }

  update(task: ToDo) {
    let updateCard = {...task};
    updateCard.status = true;
    this.updateToDo(updateCard);
    this.deleteToDo(task.id);
  }

  addToDoAfterUpdate(task: ToDo) {
    this.updateCard.id = Date.now().toString();
    this.updateCard.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.updateToDo({task: this.updateCard}));
    this.deleteToDo(task.id);
    this.updateCard = {
      id: '',
      title: '',
      description: '',
      status: false,
      dateCreated: ''
    }
  }

  updateToDo(task: ToDo): void {
    task.id = Date.now().toString();
    task.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.updateToDo({task: task}));
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logOut() {
    this.store.dispatch(AuthActions.logOut());
  }
}