import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    {
        name: "Guilherme",
        address: {
            street: "Rua",
            city: "Cidade",
            number: 123,
            zip: "CEP"
        }
    }
)

const input = {
    id: customer.id,
    name: "Guilherme update",
    address: {
        street: "Rua update",
            city: "Cidade update",
            number: 456,
            zip: "CEP update"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update cutomer use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    })
})