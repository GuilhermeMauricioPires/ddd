import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProducRepository from "../../../infrastructure/product/repository/sequilize/product.repository";




describe("Test find product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const repository = new ProducRepository();
        const product = new Product("123", "produto 1", 100);

        await repository.create(product);

        const useCase = new FindProductUseCase(repository);
        const input = {
            id: "123"
        };

        const output = {
            id: "123",
            name: "produto 1",
            price: 100
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    })

    it("should not find a product", async () => {
        const repository = new ProducRepository();        
        const useCase = new FindProductUseCase(repository);
        const input = {
            id: "123"
        };
        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    })

})