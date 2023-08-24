import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderFactoryInterface from "./order.factory.interface";
import {v4 as uuid} from "uuid";

export default abstract class OrderFactory{

    public static create(props: OrderFactoryInterface): Order{
        const itens = props.itens.map((item) => {
            return new OrderItem(uuid(), item.productId, item.name, item.price, item.quantity);
        })
        return new Order(uuid(), props.customerId, itens);
    }

}