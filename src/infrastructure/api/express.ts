import express, {Express} from 'express'
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequilize/customer.model';
import { customerRouter } from './routes/customer.route';
import ProductModel from '../product/repository/sequilize/product.model';
import { productRouter } from './routes/product.route';

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRouter)
app.use("/product", productRouter)

export let sequilize: Sequelize;

async function setupDb() {
    sequilize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });
    await sequilize.addModels([CustomerModel, ProductModel]);
    await sequilize.sync();
}
setupDb();