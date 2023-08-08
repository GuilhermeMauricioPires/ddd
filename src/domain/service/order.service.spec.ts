import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("Should place an order", () => {
        const customer = new Customer("1", "Customer");
        const orderItem = new OrderItem("1", "p1", "i1", 20, 1);
        const order = OrderService.placeOrder(customer, [orderItem]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.getTotal()).toBe(20);

    })

    it("Should get total of all orders", () =>{

        const orderItem1 = new OrderItem("1", "p1", "i1", 100, 2);
        const orderItem2 = new OrderItem("2", "p2", "i2", 200, 1);

        const order = new Order("1", "c1", [orderItem1]);
        const order2 = new Order("2", "c1", [orderItem2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(400);

    })

    it("Should add reward points", () => {

        const customer = new Customer("1", "Customer");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoint(20);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoint(20);
        expect(customer.rewardPoints).toBe(20);

    })

})