import React, {useState} from 'react';
import {v1} from 'uuid';

import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForms} from "./AddItemForms";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type  FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}
type  TaskStateType = {
    [key: string]: Array<TaskType>
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
        //достаем нужный массив по тудулист
        let tasks = tasksObj[todolistId]
        //найдем нужную таску
        //let task = tasks.map(t => t.id === id ? {...t, isDone} : t))
        let task = tasks.find(t => t.id === id)
        //изменим таску если она нашлась
        if (task) {
            task.isDone = isDone
            // task.title = newTitle
            // засетаем в стейт объекта копию объекта  что б реакт отреагировал отрисовкой
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        //let task = tasks.map(t => t.id === id ? {...t, isDone} : t))
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function removeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
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
            {id: todolistId2, title: 'what to by', filter: 'all'},
        ]
    )
    let [tasksObj, setTasks] = useState<TaskStateType>({
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

    function AddTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForms addItem={AddTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {


                            let tasksForTodolist = tasksObj[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodolistTitle={removeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
