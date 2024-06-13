import express, {Request, Response} from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequilize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRouter = express.Router();

customerRouter.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try{
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city:  req.body.address.city,
                number:  req.body.address.number,
                zip:  req.body.address.zip,
            }
        }
        const output = await useCase.execute(customerDto);
        res.status(201).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

customerRouter.get('/', async (req: Request, res: Response) =>{
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try{
        const output = await useCase.execute({});
        res.status(200).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});