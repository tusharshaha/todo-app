import React, { useCallback, useReducer, useRef } from 'react';
interface todo {
    id: number;
    text: string
}
type ActionType = | { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }
const Todo: React.FC = () => {
    const newTodoRef = useRef<HTMLInputElement>(null);
    const reducer = (state: todo[], action: ActionType) => {
        switch (action.type) {
            case 'ADD':
                return [...state, {
                    id: state.length,
                    text: action.text
                }];
            case 'REMOVE':
                return state.filter(({ id }) => id !== action.id)
        }
    }
    const [todos, dispatch] = useReducer(reducer, []);
    const handleAddTodo = useCallback(()=>{
        if(newTodoRef.current){
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value
            })
            newTodoRef.current.value = '';
        }
    },[])
    return (
        <div>
            <input type="text" ref={newTodoRef} />
            <button onClick={handleAddTodo}>Add</button>
            {
                todos.map((todo)=> <div key={todo.id}>{todo.text}</div>)
            }
        </div>
    );
};

export default Todo;