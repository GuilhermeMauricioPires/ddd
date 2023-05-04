class Customer {

    _id: string;
    _name: string;
    _address: string = '';
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
        if(id.length == 0){
            throw new Error("Id is required");
        }
    }

    validateName(name: string){
        if(name.length == 0){
            throw new Error("Name is required");
        }
    }

    validateAddres(address: string){
        if(address.length == 0){
            throw new Error("Address is required");
        }
    }

    //intenção de negócio
    changeName(name: string){
        this.validateName(name);
        this._name = name;
    }

    activate() {
        this.validateAddres(this._address);
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}