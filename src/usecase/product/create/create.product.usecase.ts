import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/produtc-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {

    private repository: ProductRepositoryInterface;

    constructor(repo: ProductRepositoryInterface){
        this.repository = repo;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto>
    {
        const product = ProductFactory.create(input.type, input.name, input.price);
        await this.repository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

}