import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  //Return the function.This is JSX which just sugarcoating over JS so it can be complied into HTLM, what gets sent to our broswer.
  //Anything in {} is JS
  return (
    <> {/* Reason that div or fragment or empty tag needs to be used because we cant return 2 diff elements at the same level, but can return 1 element with mulitple children */}
      <Route exact path='/' component={HomePage} /> {/*  remember to add navlink to NavBa.tsx to tell app where to navigate */}
      <Route 
        path={'/(.+)'} //Any route that matches / and anything else after.
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}> {/* Styling needed to be done here coz the Nav Bar is using fixed top which doesnt provide any margine below it */}
              {/* <ActivityDashboard /> {/* The ActivityDashboard component will handle the activity function. Removed as we are now using routing */} 
              <Route exact path='/activities' component={ActivityDashboard} /> {/* ActivityDashboard is highlighted in blue coz its an observer. */}
              <Route path='/activities/:id' component={ActivityDetails} />{/*  ActivityDetail is highlighted in yellow coz it is not an observer. */}
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> {/* {[]} allows us to add an array in the routing */}
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
