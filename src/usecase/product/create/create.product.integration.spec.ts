import { Sequelize } from "sequelize-typescript"
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import ProducRepository from "../../../infrastructure/product/repository/sequilize/product.repository"

const input = {
    type: "a",
    name: "produto 1",
    price: 200
}

describe("Test create product use case", () => {

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
    
    it("should create a product", async () => {
        const repository = new ProducRepository();        
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })
})