import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Teste find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer",async () => {
        
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);
        const customer = new Customer("123", "Guilherme");
        const address = new Address("Rua um", 123, "zip", "Florianópolis");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123"
        };

        const output = {
            id: "123",
            name: "Guilherme",
            address: {
                street: "Rua um",
                number: 123,
                zip: "zip",
                city: "Florianópolis"
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

    })


})