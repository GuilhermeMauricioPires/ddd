import OrderItem from "./order_item";

describe("Order Item unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let orderItem = new OrderItem("", "p1", "item 1", 100, 1);
        }).toThrowError("Id is required")        
    })

    it("should throw erro when productId is empty", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "", "item 1", 100, 1);
        }).toThrowError("ProductId is required")        
    })

    it("should throw erro when name is empty", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "p1", "", 100, 1);
        }).toThrowError("Name is required")        
    })

    it("should throw erro when price less than zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "p1", "item 1", -10, 1);
        }).toThrowError("Price must be greater than zero")        
    })

    it("should throw erro when price equal than zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "p1", "item 1", 0, 1);
        }).toThrowError("Price must be greater than zero")        
    })

    it("should throw erro when quantity less than zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "p1", "item 1", 100, -1);
        }).toThrowError("Quantity must be greater than zero")        
    })

    it("should throw erro when quantity equal than zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "p1", "item 1", 100, 0);
        }).toThrowError("Quantity must be greater than zero")        
    })

    it("should create order_item by constructor", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 100, 2);
        expect(orderItem).toBeInstanceOf(OrderItem);
    })

    it("should calculate total", () => {
        let orderItem = new OrderItem("1", "product1", "Item 1", 155, 2);
        expect(orderItem.getTotal()).toBe(310);
    })

})