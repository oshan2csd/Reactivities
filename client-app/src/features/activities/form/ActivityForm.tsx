import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity: Activity | undefined;
    closeForm: ()=> void;
    createOrEdit: (activity: Activity) => void;
}


//Note: activity is given an alias by using ":"
export default function ActivityForm({activity: selectedActivity , closeForm, createOrEdit}: Props){

    //null coalescing operator has used here
    //if left operand is null or undefined then take right operand
    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        date:'',
        description:'',
        category:'',
        city:'',
        venue:'',
    }

    const [activity, setActivity] = useState(initialState);

    /*  //React does not know about form data changes 
        //unless we handle it this way
        //Refer to folowing two functions
    */
    function handleSubmit(){
        createOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){        
        const {name, value} = event.target;//destructuring properties from event.target (target is current input field)
        setActivity({...activity, [name]:value});//latter part is just setting whatever the value 
                                                //inside "[name]" (which is 'title' at the moment) to value of "value"
                                                //just plain javascript (destructuring/ default value assigning)


    }


    return(
        <Segment clearing> 
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description...' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' color='blue' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' /> 
            </Form>           
        </Segment>

    )
}