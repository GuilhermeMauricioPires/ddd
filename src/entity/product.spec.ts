import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Product unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let product = new Product("", "Produto 1", 100);
        }).toThrowError("Id is required")        
    })

    it("should throw erro when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100);
        }).toThrowError("Name is required")        
    })

    it("should throw erro when price less than zero", () => {
        expect(() => {
            let product = new Product("1", "Produto 1", -1);
        }).toThrowError("Price must be greater than zero")        
    })

    it("should change name", () => {
        let product = new Product("1", "Produto 1", 10);
        product.changeName("Produto 2");
        expect(product.getName()).toBe("Produto 2");
    })

    it("should change price", () => {
        let product = new Product("1", "Produto 1", 10);
        product.changePrice(20);
        expect(product.getPrice()).toBe(20);
    })
})