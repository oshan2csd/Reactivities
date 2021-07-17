import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


//Note: activity is given an alias by using ":"
export default observer( function ActivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity, closeForm , createActivity, updateActivity, loading} = activityStore;

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
        activity.id? updateActivity(activity) : createActivity(activity)
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
                <Form.Input required='true' placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description...' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input required='true' placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input required='true' type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input required='true' placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input required='true' placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' color='blue' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' /> 
            </Form>           
        </Segment>

    )
})