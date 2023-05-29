import Address from "./address";
import Customer from "./customer"

describe("Customer unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Guilherme");
        }).toThrowError("Id is required")        
    })

    it("should throw erro when id is empty", () => {
        expect(() => {
            let customer = new Customer("111", "");
        }).toThrowError("Name is required")        
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
            customer.activate();
            let spy = jest.spyOn(customer, 'validateAddres');
            expect(spy).toHaveBeenCalledTimes(1);
        }).toThrowError("Address is required")                
    })

    it("should create customer and add address", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        expect(customer.getAddress()).toBeInstanceOf(Address);
    })

    it("should create customer and change address", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        let address2 = new Address("Rua 2", 333, "555555", "São José");
        customer.changeAddress(address2);
        expect(customer.getAddress()).toBe(address2);
    })

    it("should create customer and activate", () => {
        let customer = new Customer("111", "Guilherme");
        let address = new Address("Rua 1", 222, "3333333", "Florianopolis");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.getActive()).toBe(true);
        expect(customer.getAddress()).toBeInstanceOf(Address);
    })

})