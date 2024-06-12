import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/productb";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "produto 1", 100);
const product2 = new ProductB("456", "produto 2", 100);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list product use case", () => {

    it("should list a product", async () => {

        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

    });

})