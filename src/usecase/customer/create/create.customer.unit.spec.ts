import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Guilherme",
    address: {
        street: "Rua um",
        number: 123,
        zip: "zip",
        city: "Florianópolis"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit teste create customer use case", () => {

    it("should create a customer",async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);
        
        const output = await useCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zip: input.address.zip,
            }
        })

    });

    it("should throw erro when name is missing",async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);
        
        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Name is required"
        )
    });

    it("should throw erro when street is missing",async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);
        
        input.name = "Guilherme";
        input.address.street = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Street is required"
        )

    });

})