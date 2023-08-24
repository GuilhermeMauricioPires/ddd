import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("Should create a customer", () => {
        const props = {name: "Customer A"};
        const customer = CustomerFactory.create(props);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe(props.name);
        expect(customer).toBeInstanceOf(Customer);
    });

    it("Should create a customer with address", () => {
        const props = {
            name: "Customer A",
            address: {
                street: "Street A",
                number: 1,
                zip: "Zip A",
                city: "City A",
            }
        };
        const customer = CustomerFactory.createWithAddress(props);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe(props.name);
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe(props.address.street);
        expect(customer.address.number).toBe(props.address.number);
        expect(customer.address.zip).toBe(props.address.zip);
        expect(customer.address.city).toBe(props.address.city);
        expect(customer.address).toBeInstanceOf(Address);
        expect(customer).toBeInstanceOf(Customer);
    });

})