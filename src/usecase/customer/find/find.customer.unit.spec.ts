import { Sequelize, UpdatedAt } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Guilherme");
const address = new Address("Rua um", 123, "zip", "Florianópolis");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste find customer use case", () => {

    it("should find a customer",async () => {
        
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);            
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

    });

    it("should not find a customer",async () => {        
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })
        const useCase = new FindCustomerUseCase(customerRepository);            
        const input = {
            id: "123"
        };

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Customer not found");

    });


})