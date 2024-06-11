import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>
    {

        const customer = CustomerFactory.createWithAddress(
            {   name: input.name, 
                address: {
                    street: input.address.street,
                    number: input.address.number,
                    zip: input.address.zip,
                    city: input.address.city
                }
            });

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city
            }
        }

    }

}