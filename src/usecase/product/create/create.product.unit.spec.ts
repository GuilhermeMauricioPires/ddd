import CreateProductUseCase from "./create.product.usecase"

const input = {
    type: "a",
    name: "produto 1",
    price: 200
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {

    it("should create a product", async () => {

        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it("should throw erro when name is missing",async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);
        
        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Name is required"
        )
    });

    it("should throw erro when price is negative",async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);
        
        input.name = "produto 1";
        input.price = -10

        await expect(useCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        )
    });

    it("should throw erro when type is invalid",async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);
        
        input.name = "produto 1";
        input.price = 200
        input.type = "c"

        await expect(useCase.execute(input)).rejects.toThrow(
            "Type not suported"
        )
    });

})