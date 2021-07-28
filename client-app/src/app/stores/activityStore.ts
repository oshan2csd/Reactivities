/*
    NOTE: When using async await in MobX stores, statements after await
    will execute in 'next tick'
    because of that we need to add those latter part in a seperate function (we called them actions)
    Or
    need to wrap that code inside a "runInAction" method 
*/

import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from 'uuid';

export default class ActivityStore{

    activityRegistry = new Map<string, Activity>();//list of activities
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

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
        try {
                this.loadingInitial = true;
                const activities = await agent.Activities.list();            
                activities.forEach(acti => {
                    this.setActivity(acti);
                });  
            this.setLoadingInitial(false);                    
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    //get individual activity by ID
    // 1. if available in ActivityRegistry (in memory) take it from there
    // 2. if not call backend api

    //`return activity;` is optional
    //it is used to make sure loadActivity returns a promise of Activity.
    //And Not a promise of void 
    //Because, we need to return a promise of Activity from here for some other place
    loadActivity = async (id:string) =>{
        this.loadingInitial = true;
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            this.loadingInitial = false;
            return activity;
        }else{
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);   
                this.setActivity(activity); 
                this.setLoadingInitial(false); 
                runInAction(()=>{
                    this.selectedActivity = activity; 
                });
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //this is a private helper method
    //not available as an action in this store
    //to find activity from Activity Registry
    private getActivity(id: string) {
        return this.activityRegistry.get(id);
    }

    //this is a private helper method
    //add activity into Activity Registry (Map)
    private setActivity(activity : Activity){
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }



    //this is an action
    // when state variables change inside an action no need 
    //to wrap them inside runInAction (whereever they update)
    setLoadingInitial(value:boolean){
        this.loadingInitial = value;
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
            return activity;
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

