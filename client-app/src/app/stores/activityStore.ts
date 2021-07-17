import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();//list of activities
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    //sort activities by date
    //returns an array out from activityRegistry Map
    //this is a computed value
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a,b) =>  Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();            
            activities.forEach(acti => {
                acti.date = acti.date.split('T')[0];
                this.activityRegistry.set(acti.id, acti);
            });  
            this.setLoadingInitial(false);                    
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //this is an action
    // when state variables change inside an action no need 
    //to wrap them inside runInAction (whereever they update)
    setLoadingInitial(value:boolean){
        this.loadingInitial = value;
    }

    selectActivity = (id:string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = ()=>{
        this.selectedActivity = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuidv4()
        try{
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
                this.editMode = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{                
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })           
        }
    }

    deleteActivity = async (id:string) =>{
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() =>{
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();//to remove from details view after deleted
                this.loading = false;

            })            
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

