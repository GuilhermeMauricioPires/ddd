import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {

    protected _id: string;
    public notification: Notification;

    constructor(){
        this.notification = new Notification();
    }

    get id(){
        return this._id;
    }

    checkNotification(){
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors());            
        }
    }

}