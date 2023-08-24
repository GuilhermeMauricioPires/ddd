import {v4 as uuid} from "uuid";
import Order from "../entity/order";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  
    it("should create an order", () => {

        const props = {
            customerId: uuid(),
            itens: [{
                productId: uuid(),
                name: "Product 1",
                price: 100,
                quantity: 2
            }]
        };

        const order = OrderFactory.create(props);
        expect(order.id).toBeDefined();
        expect(order.customerId).toBe(props.customerId);
        expect(order.itens).toHaveLength(1);
        expect(order).toBeInstanceOf(Order);

    });

})