import { useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';



function App() {

  const {activityStore} = useStore();  

  /**
   * client-app is running on port 3000
   * here it is trying to send a GET request from a different port (different domain)
   * Browser security will stop this
   * To allow that we need to add CORS support in Startup.cs class (to whitelist new port or domain)
   * In Configure() and ConfigureServices()
   */
  useEffect(() => {
    activityStore.loadActivities();
  },[activityStore])

  /**
   * Before painting the UI (NavBar, Dashboard etc..)
   * Check status of loading and display if required   
   */
  if(activityStore.loadingInitial) return <LoadingComponent />

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard />
      </Container>        
    </>
  );
}

export default observer(App);
