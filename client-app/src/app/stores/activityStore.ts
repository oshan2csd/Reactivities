import { makeAutoObservable} from "mobx";

export default class ActivityStore{


    constructor(){
        makeAutoObservable(this)
    }
}