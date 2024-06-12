import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import ProducRepository from "../../../infrastructure/product/repository/sequilize/product.repository"
import CreateProductUseCase from "../create/create.product.usecase"
import Product from "../../../domain/product/entity/product"

const inputCreate = {
    type: "a",    
    name: "produto 1",
    price: 100
}

describe("Test update product use case", () => {

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

    it("should update a product", async () => {
        const repository = new ProducRepository();
        const product = new Product("123", "produto 1", 100);
        await repository.create(product)

        const useCase = new UpdateProductUseCase(repository);

        const input = {
            id: product.id,
            name: "produto 2 update",
            price: 200
        }        

        const output = await useCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })
})