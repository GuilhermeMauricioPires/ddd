import Address from "../value-object/address";
import Customer from "./customer"

describe("Customer unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Guilherme");
        }).toThrowError("customer: Id is required")        
    })

    it("should throw erro when name is empty", () => {
        expect(() => {
            let customer = new Customer("111", "");
        }).toThrowError("customer: Name is required")        
    })

    it("should throw erro when id and name are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required")        
    })

    it("should create customer by constructor", () => {
        let customer = new Customer("111", "Guilherme");
        // let spy = jest.spyOn(customer, 'validate');
        // expect(spy).toHaveBeenCalledTimes(1);
        expect(customer).toBeInstanceOf(Customer);
    })

    it("should throw erro when activate without address", () => {
        expect(() => {
            let customer = new Customer("111", "Guilherme");            
            let spy = jest.spyOn(customer, 'validateAddres');
            customer.activate();
            expect(spy).toHaveBeenCalledTimes(1);
        }).toThrowError("Address is required")                
    })

    it("should create customer and add address", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        expect(customer.address).toBeInstanceOf(Address);
    })

    it("should create customer and change address", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        let address2 = new Address("Rua 2", 333, "555555", "São José");
        customer.changeAddress(address2);
        expect(customer.address).toBe(address2);
    })

    it("should create customer and activate", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.active).toBe(true);
        expect(customer.address).toBeInstanceOf(Address);
    })

})