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
        let orderItem = new OrderItem("1", "Item 1", 100);
        let order = new Order("1", "c1", [orderItem]);
        expect(order).toBeInstanceOf(Order);
        expect(order.getTotal()).toBe(100);
    })

    it("should calculate total", () => {
        let orderItem = new OrderItem("1", "Item 1", 100);
        let orderItem2 = new OrderItem("2", "Item 2", 150);
        let order = new Order("1", "c1", [orderItem, orderItem2]);
        expect(order.getTotal()).toBe(250);
    })

})