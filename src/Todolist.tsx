import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from "./App";




export type TaskTask = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id:string
    title: string,
    tasks: Array<TaskTask>,
    removeTask: (id: string, todolistId:string) => void,
    changeFilter: (value: FilterValuesType,todoListId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeStatus: (id:string, isDone:boolean, todolistId:string)=>void
    filter: FilterValuesType,
    removeTodolist:(todolistId:string)=>void

}


export function Todolist(props: PropsType) { //props ={title ='what to learn', tasks=[]}

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error,setError] =useState<string|null> (null)



    const addTask = () => {
         if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        } else {
        setError('title is required')}

     }


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=> { setError(null)
        if(e.charCode===13){addTask()}
    }
 const onAllClickHandler =() => { props.changeFilter('all', props.id)}
 const onActiveClickHandler =() => { props.changeFilter('active',props.id) }
 const onCompletedClickHandler =() => { props.changeFilter('completed',props.id)}
 const removeTodolist=()=>{props.removeTodolist(props.id)}


    return (
        <div>
            <h3> {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />


                <button onClick={addTask}>+</button>
                { error && <div className='error-message'>{error}</div>}
            </div>

            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler =() => {
                        props.removeTask(t.id,props.id)
                    }
                    const onChangeHandlerCheck  = (e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue,props.id)

                    }
                    return <li key={t.id} className={ t.isDone ?'is-done' :''}>
                        <input type='checkbox'
                               onChange={onChangeHandlerCheck}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>

                    </li>
                })}


            </ul>
            <div>
                <button  className={props.filter==="all" ? 'active-filter' : ''}
                         onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter==="active" ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter==="completed" ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}