import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let order = new Order("", "c1", []);
        }).toThrowError("Id is required")        
    })

    it("should throw erro when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required")        
    })

    it("should throw erro when itens are empty", () => {
        expect(() => {
            let order = new Order("1", "2", []);
        }).toThrowError("Itens are required")        
    })

    it("should create order by constructor", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 100, 2);
        let order = new Order("1", "c1", [orderItem]);
        expect(order).toBeInstanceOf(Order);
    })

    it("should calculate total", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 100, 2);
        let orderItem2 = new OrderItem("1", "product2", "Item 2", 150, 2);
        let order = new Order("1", "c1", [orderItem, orderItem2]);
        expect(order.getTotal()).toBe(500);
    })

    it("should update order item list by order", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 100, 2);
        let order = new Order("1", "c1", [orderItem]);
        expect(order).toBeInstanceOf(Order);
        expect(order.itens.length).toBe(1);
        expect(order.getTotal()).toBe(200);

        let orderItem2 = new OrderItem("1", "product2", "Item 2", 150, 2);
        order.changeItens([orderItem, orderItem2]);
        expect(order.itens.length).toBe(2);
        expect(order.getTotal()).toBe(500);
    })

    it("should throw erro when update order item with empy list", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 100, 2);
        let order = new Order("1", "c1", [orderItem]);
        expect(order).toBeInstanceOf(Order);
        expect(order.itens.length).toBe(1);
        expect(order.getTotal()).toBe(200);

        expect(() => {
            order.changeItens([]);
        }).toThrowError("Itens are required")
    })

})