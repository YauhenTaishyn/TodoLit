import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormsPropsType = {
    addItem: (title: string) => void
}

export function AddItemForms(props: AddItemFormsPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('title is required')
        }

    }


    return <div>
        <TextField variant='outlined'
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            //className={error ? 'error' : ''}
                   error={!!error}
                   label='Title'
                   helperText={error}
        />


        <IconButton color='primary' onClick={addTask}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>
}