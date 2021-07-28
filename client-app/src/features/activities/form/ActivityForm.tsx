import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


//Note: activity is given an alias by using ":"
export default observer( function ActivityForm(){

    const history = useHistory();
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const {id} = useParams<{id:string}>();


    //state variable for Activity
    const [activity, setActivity] = useState({ 
        id:'',
        title:'',
        date:'',
        description:'',
        category:'',
        city:'',
        venue:''
    });

    useEffect(() => {
        if(id) {
            // '!' tells Typescript to ignore the warning
            //as a developer we know, it has the output as expected 
            loadActivity(id).then(acti => setActivity(acti!));
        }
    }, [id, loadActivity]);
    
 
    function handleSubmit(){
        if(activity.id){
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        } else{
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }
   
    /*  //React does not know about form data changes 
        //unless we handle it this way
        //Refer to folowing two functions
    */
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){        
        const {name, value} = event.target;//destructuring properties from event.target (target is current input field)
        setActivity({...activity, [name]:value});//latter part is just setting whatever the value 
                                                //inside "[name]" (which is 'title' at the moment) to value of "value"
                                                //just plain javascript (destructuring/ default value assigning)


    }

    if(activity.id.length !== 0 && loadingInitial) return <LoadingComponent content='Loading activity...' />

    return(
        <Segment clearing> 
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input required placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description...' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input required placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input required type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input required placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input required placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' color='blue' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' /> 
            </Form>           
        </Segment>

    )
})