import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";


export default function NavBar() {

    //const {activityStore} = useStore(); //Replaced by routing

    return ( 
        //invert = darker, fixed = top of screen
        <Menu inverted fixed='top'> 
            <Container>
                <Menu.Item as={NavLink} to ='/' header> {/* This tells which link to go to when button clicked */}
                    <img src="/assets/logo.png" alt="logo" style = {{marginRight: '10px'}}/>
                    Reactivities
                    </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}