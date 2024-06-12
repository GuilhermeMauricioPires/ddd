import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/produtc-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase{

    private repository: ProductRepositoryInterface;

    constructor(repo: ProductRepositoryInterface){
        this.repository = repo;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto>
    {
        const products = await this.repository.findAll();
        return OutputMapper.toOutput(products);
    }

}

class OutputMapper {
    static toOutput(product: ProductInterface[]): OutputListProductDto{
        return {
            products: product.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                };
            })
        }
    }
}