import Address from "./address";

export default class Customer {

    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate(){
        this.validateId(this._id);
        this.validateName(this._name);    
    }

    validateId(id: string){
        if(id.length === 0){
            throw new Error("Id is required");
        }
    }

    validateName(name: string){
        if(name.length === 0){
            throw new Error("Name is required");
        }
    }

    validateAddres(){
        if(this._address === undefined){
            throw new Error("Address is required");
        }
    }

    changeAddress(address: Address){
        this._address = address;
    }

    //intenção de negócio
    changeName(name: string){
        this.validateName(name);
        this._name = name;
    }

    activate() {
        this.validateAddres();
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}
