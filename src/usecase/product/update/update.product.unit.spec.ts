import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create("a", "produto 1", 100)

const input = {
    id: product.id,
    name: "produto 2 update",
    price: 200
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update product use case", () => {

    it("should update a product", async () => {
        const repository = MockRepository();
        const useCase = new UpdateProductUseCase(repository);

        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    })
})