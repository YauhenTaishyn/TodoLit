import React, {useState} from 'react';
import {v1} from 'uuid';

import './App.css';
import {TaskTask, Todolist} from "./Todolist";


export type  FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}

function App() {

    // let tasks = arr[0]
    // let setTasks = arr[1]
    // let [tasks, setTasks] =arr


    let [filter, setFilter] = useState<FilterValuesType>('all')


    function addTask(title: string, todolistId: string) {
        if (title.trim() !== '') {
            let task = {id: v1(), title: title.trim(), isDone: false}

            let tasks = tasksObj[todolistId]
            let newTasks = [task, ...tasks]
            tasksObj[todolistId] = newTasks
            setTasks({...tasksObj})
        }
    }


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id)
        //return t.id !== id
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todolists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value

            setTodolists([...todolists])

        }
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        //let task = tasks.map(t => t.id === id ? {...t, isDone} : t))
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filterTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filterTodolist);
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: 'what to learn', filter: 'all'},
            {id: todolistId2, title: 'what to by', filter: 'active'},
        ]
    )
    let [tasksObj, setTasks] = useState({
            [todolistId1]: [
                {id: v1(), title: 'css', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'TypeScript', isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: 'ddaaaaa', isDone: true},
                {id: v1(), title: 'sddd', isDone: true},
                {id: v1(), title: 'Rsdsd', isDone: false},

            ]
        }
    )

    return (
        <div className="App">
            {
                todolists.map(tl => {


                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })

            }
        </div>
    );
}

export default App;
