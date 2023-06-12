import Product from "../entity/product";

describe("Product service unit tests", () => {

    it("Should change prices all products", ()=>{
        const product1 = new Product("p1", "Produto 1", 100);
        const product2 = new Product("p2", "Produto 2", 200);
        const products = [product1, product2];
        ProductService.increasePrice(products, 100);
        expect(product1.getPrice()).toBe(200);
        expect(product2.getPrice()).toBe(400);
    })

});