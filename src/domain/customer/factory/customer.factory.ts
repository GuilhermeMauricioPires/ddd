import Customer from "../entity/customer";
import {v4 as uuid} from "uuid";
import CustomerFactoryInterface from "./customer.factory.interface";
import Address from "../value-object/address";

export default abstract class CustomerFactory {

    public static create(props: CustomerFactoryInterface): Customer {
        return new Customer(uuid(), props.name);
    }

    public static createWithAddress(props: CustomerFactoryInterface): Customer {
        let customer = new Customer(uuid(), props.name);
        const address = new Address(props.address.street, props.address.number, props.address.zip, props.address.city);
        customer.changeAddress(address);
        return customer;
    }

}