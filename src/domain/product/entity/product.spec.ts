import Product from "./product";

describe("Product unit tests", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

    it("should throw erro when id is empty", () => {
        expect(() => {
            let product = new Product("", "Produto 1", 100);
        }).toThrowError("product: Id is required")        
    })

    it("should throw erro when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100);
        }).toThrowError("product: Name is required")        
    })

    it("should throw erro when price less than zero", () => {
        expect(() => {
            let product = new Product("1", "Produto 1", -1);
        }).toThrowError("product: Price must be greater than zero")        
    })

    it("should throw erro when id and name are empty and price less than zero", () => {
        expect(() => {
            let product = new Product("", "", -1);
        }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero")        
    })

    it("should change name", () => {
        let product = new Product("1", "Produto 1", 10);
        product.changeName("Produto 2");
        expect(product.name).toBe("Produto 2");
    })

    it("should throw erro when change name is empty", () => {
        let product = new Product("1", "Produto 1", 10);
        expect(() => {
            product.changeName("");
        }).toThrowError("product: Name is required")              
    })

    it("should change price", () => {
        let product = new Product("1", "Produto 1", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    })

    it("should throw erro when change price less than zero", () => {
        let product = new Product("1", "Produto 1", 10);
        expect(() => {
            product.changePrice(-1);
        }).toThrowError("product: Price must be greater than zero")              
    })
})