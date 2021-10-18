import React, {ChangeEvent} from 'react'
import {FilterValuesType} from "./App";
import {AddItemForms} from "./AddItemForms";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void
    removeTodolistTitle: (id: string, newTitle: string) => void

}


export function Todolist(props: PropsType) {//props ={title ='what to learn', tasks=[]}


    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const removeTodolistTitle = (newTitle: string) => {
        props.removeTodolistTitle(props.id, newTitle)
    }


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    // @ts-ignore
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={removeTodolistTitle}/>
                <Button variant='contained' color='primary' onClick={removeTodolist}>x</Button>
            </h3>
            <AddItemForms addItem={addTask}/>


            <div>
                {props.tasks.map((t) => {
                    const removeTodolist = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id)

                    }

                    const onChangeTitleHandler = (newValue: string) => {

                        props.changeTaskTitle(t.id, newValue, props.id)

                    }


                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color={'primary'}
                            onChange={onChangeStatusHandler}
                            checked={t.isDone}/>

                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>

                        <IconButton onClick={removeTodolist}>
                            <Delete/>
                        </IconButton>

                    </li>
                })}


            </div>
            <div>
                <Button variant={props.filter === "all" ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'default'}
                >All

                </Button>
                <Button variant={props.filter === "active" ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}
                >Active
                </Button>
                <Button variant ={props.filter === "completed" ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
}

