import React, { useCallback, useReducer, useRef, useState } from 'react';
import { Alert, AlertIcon, Box, Button, Flex, Input, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

interface todo {
    id: number;
    text: string
}
type ActionType = | { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }
const Todo: React.FC = () => {
    const [error, setError] = useState<boolean | null>(null)
    // this is input reference
    const newTodoRef = useRef<HTMLInputElement>(null);
    // get todo from localStorage
    const tasks: todo[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    // set todo to localStorage
    const setTodo: (arr: todo[]) => void = (arr) => {
        localStorage.setItem('tasks', JSON.stringify(arr));
    }
    // reducer function
    const reducer = (state: todo[], action: ActionType) => {
        switch (action.type) {
            case 'ADD':
                setTodo([...state, {
                    id: state.length,
                    text: action.text
                }])
                return [...state, {
                    id: state.length,
                    text: action.text
                }];
            case 'REMOVE':
                setTodo(state.filter(({ id }) => id !== action.id))
                return state.filter(({ id }) => id !== action.id)
        }
    }
    const [todos, dispatch] = useReducer(reducer, tasks);
    const handleAddTodo = useCallback(() => {
        if (!newTodoRef?.current?.value) {
            setError(true);
            return
        }
        if (newTodoRef.current) {
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value
            })
            newTodoRef.current.value = '';
            setError(false);
        }
    }, [])
    const handleRemove = (id: number) => {
        dispatch({
            type: 'REMOVE',
            id: id
        })
        setError(null);
    }
    return (
        <Box mt='12'>
            <Box mb='7'>
                {error &&
                    <Alert status='error' variant='left-accent'>
                        <AlertIcon />
                        Please Write a task first!
                    </Alert>
                }
                {error === false &&
                    <Alert status='success' variant='left-accent'>
                        <AlertIcon />
                        Successfully Added Task.
                    </Alert>
                }
            </Box>

            <Flex gap={3}>
                <Input ref={newTodoRef} placeholder='Add a Task' />
                <Button onClick={handleAddTodo} colorScheme='teal'>Add</Button>
            </Flex>
            <List mt='7' spacing={3}>
                {
                    todos.map((todo) => <ListItem key={todo.id}>
                        <Flex justifyContent='center' gap={3}>
                            <Text fontSize='2xl'>
                                <ListIcon as={CheckCircleIcon} color='green.500' />
                                {todo.text}
                            </Text>
                            <Button
                                colorScheme='red'
                                borderRadius='full'
                                p='2'
                                size='xm'
                                onClick={() => handleRemove(todo.id)}
                            >
                                Remove
                            </Button>
                        </Flex>
                    </ListItem>)
                }
            </List>
        </Box>
    );
};

export default Todo;