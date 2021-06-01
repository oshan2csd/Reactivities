import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    openForm1: () => void;// no id required as it is creating a new activity
}

export default function NavBar({openForm1}: Props){
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activites"/>
                <Menu.Item>
                    <Button onClick={openForm1} positive content='Create Activity'/>
                </Menu.Item>       
            </Container>
        </Menu>
    )
}