import express, {Request, Response} from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProducRepository from '../../product/repository/sequilize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProducRepository());
    try{
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        }
        const output = await useCase.execute(productDto);
        res.status(201).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

productRouter.get('/', async (req: Request, res: Response) =>{
    const useCase = new ListProductUseCase(new ProducRepository());
    try{
        const output = await useCase.execute({});
        res.status(200).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});