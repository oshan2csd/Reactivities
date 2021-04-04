import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';



function App() {

  const [activities, setActivities] = useState([]);


  //client-app is running on port 3000
  //here it is trying to send a GET request from a different port (different domain)
  //Browser security will stop this
  //To allow that we need to add CORS support in Startup.cs class (to whitelist new port or domain)
  //In Configure() and ConfigureServices()
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then( response => {
      console.log(response);
      setActivities(response.data);
    })
    .catch(error => console.log(error))//optional
  }, [])

  


  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities'/>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
        {activities.map((activity:any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          )) }
        </ul>
    </div>
  );
}

export default App;
