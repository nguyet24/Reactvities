import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activities';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

//Create a javascript function.
function App() {
 
  //Hook #1 - Set State. Go to Development Tools in chrome and click on Component (Chrome extension)
  const [activities, setActivities] = useState<Activity[]>([]); // Our state is a type of activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); //the | mean to use state when there is an activity or undefine.
  const [editMode, setEditMode] = useState(false); //Not using <> because we use false

  //Hook #2 - To get a promise back from Axios so we can do somet
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    setActivities(response.data);
    })
  }, []) //[] stops the useEffect from looping and rendereing over and over


  //Get defined activities. 
  //Gets the above const array and matches it against the activities ID that we are passing in as a parameter.
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id)) // x is just a variable that stores the array. Like i in excel
  }

  //Get unfined activities
  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  //Edit Function
  function handleFormOpen(id?: string) { //? means optional parameter. ID will be a string.
    id ? handleSelectActivity(id) : handleCancelSelectedActivity(); //if there is an id then handleSelectActivity, if id is false thenn handleCancelSelected Activity
    setEditMode(true); //if above criteria is true then setEditMode variable to true
  }

  //Close Function
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
      ? setActivities([...activities.filter(x=>x.id !== activity.id), activity]) //this loops over the exisiting activity, if newly enter id <> activity.id
      : setActivities([...activities, {...activity, id: uuid()}]); //add new activity on to the activity array, UUID external library to assign ID, need to npm instal uuid to use 
    setEditMode(false); 
    setSelectedActivity(activity); //set the new activity to activity 
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  //Return the function 
  //This is JSX which just sugarcoating over JS so it can be complied into HTLM, what gets sent to our broswer.
  //Anything in {} is JS
  return (
    //Can use Div but can see in element. 
    //Reason that div or fragment or empty tag needs to be used because we cant return 2 diff elements at the same level, but can return 1 element with mulitple children
    <Fragment> 
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}> {/* Styling needed to be done here coz the Nav Bar is using fixed top which doesnt provide any margine below it */}
        <ActivityDashboard //For this to show on the app, the below must be added to ActivityDashboard.tsx
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        /> {/* The ActivityDashboard component will handle the activity function */}
      </Container>
    </Fragment>
  );
}

export default App;
