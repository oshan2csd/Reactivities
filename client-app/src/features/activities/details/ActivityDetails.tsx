import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityDetails(){

    const {activityStore} = useStore();
    
    //destructuring values from activityStore
    const {selectedActivity:activity, loadActivity, loadingInitial} = activityStore;//selectedActivity renamed to activity
    const {id} = useParams<{id: string}>();   

    useEffect(() =>{
        if(id) loadActivity(id);
    },[id, loadActivity]); 

    //if activity is not defined return
    //otherwise below code will be yelling about it might be undefined
    if( loadingInitial || !activity) return <LoadingComponent />;

    return(        
        <Card fluid>
            <Image  src={`/assets/Images/categoryImages/${activity.category}.jpg`}  />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button as={Link} to={`/edit/${activity.id}`} basic content='Edit' color='blue'/>
                    <Button as={Link} to='/activities' basic content='Cancel' color='grey'/>
                </ButtonGroup>
            </Card.Content> 
        </Card>
    )
})