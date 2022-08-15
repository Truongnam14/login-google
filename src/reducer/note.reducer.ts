import { ToDoState } from 'src/states/note.state';
import { createReducer, on } from "@ngrx/store"
import * as ToDoActions from "src/actions/note.actions";

const initialState: ToDoState = {
    toDos: [],
    isloading: false,
    error: ''
}

export const ToDoReducer = createReducer(
    initialState,
    on(ToDoActions.addToDo, (state) => ({
        ...state,
        isloading: true
    })),
    on(ToDoActions.addToDoSuceeded, (state) => ({
        ...state,
        toDos: [],
        error: '',
        isloading: false
    })),
    on(ToDoActions.addToDoFailed, (state, { error }) => ({
        ...state,
        toDos: [],
        error,
        isloading: false
    })),
    on(ToDoActions.getAll, (state) => ({
        ...state,
        isloading: true
    })),
    on(ToDoActions.getAllSucceeded, (state, { todos }) => ({
        ...state,
        toDos: todos,
        error: '',
        isloading: false
    })),
    on(ToDoActions.getAllFailed, (state, { error }) => ({
        ...state,
        toDos: [],
        error,
        isloading: false
    }))
);