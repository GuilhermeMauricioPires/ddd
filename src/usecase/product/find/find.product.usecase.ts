import ProductRepositoryInterface from "../../../domain/product/repository/produtc-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase{

    private repository: ProductRepositoryInterface;

    constructor(repo: ProductRepositoryInterface){
        this.repository = repo;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto>
    {
        const product = await this.repository.find(input.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

}