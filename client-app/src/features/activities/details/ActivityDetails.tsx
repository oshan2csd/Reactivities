import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityDetails(){

    const {activityStore} = useStore();
    //destructuring values from activityStore
    const {selectedActivity:activity, openForm, cancelSelectedActivity} = activityStore;//selectedActivity renamed to activity

    //if activity is not defined return
    //otherwise below code will be yelling about it might be undefined
    if(!activity) return <LoadingComponent />;

    return(
        <Card fluid>
            <Image src={`assets/Images/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic content='Edit' color='blue'/>
                    <Button onClick={cancelSelectedActivity} basic content='Cancel' color='grey'/>
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
})