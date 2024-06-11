import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress({
    name: "Guilherme",
    address: {
        street: "Rua",
        city: "Cidade",
        zip: "CEP",
        number: 123
    }
})

const customer2 = CustomerFactory.createWithAddress({
    name: "Sr. Asd",
    address: {
        street: "Rua teste",
        city: "Cidade teste",
        zip: "CEP teste",
        number: 456
    }
})

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list cutomer use case", () => {

    it("should list a customer", async () => {

        const customerRepository = MockRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);

    });

})