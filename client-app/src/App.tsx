import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

//Create a javascript function.
function App() {
 
  //Hook #1
  const [activities, setActivities] = useState([]);

  //Hook #2 - To get a promise back from Axios so we can do somet
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
    console.log(response); 
    setActivities(response.data);
    })
  }, []) //[] stops the useEffect from looping and rendereing over and over

  //Return the function 
  //This is JSX which just sugarcoating over JS so it can be complied into HTLM, what gets sent to our broswer.
  //Anything in {} is JS
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />

      <List>
        {activities.map((activity: any) => (
          <List.Item key = {activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
