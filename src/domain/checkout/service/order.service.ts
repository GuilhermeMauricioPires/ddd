import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService{

    static placeOrder(customer: Customer, itens: OrderItem[]): Order {

        if(itens.length === 0){
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, itens);
        customer.addRewardPoint(order.getTotal());
        return order;

    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.getTotal(), 0)
    }

}