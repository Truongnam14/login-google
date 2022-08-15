import { ToDo } from 'src/model/note.model';

export interface ToDoState {
    toDos: ToDo[];
    isloading: boolean;
    error: string;
}