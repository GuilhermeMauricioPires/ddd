import Product from "../entity/product";
import ProductB from "../entity/productb";
import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("Should create product A", () => {
        const product = ProductFactory.create("a","Product A", 10);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10);
        expect(product).toBeInstanceOf(Product);
    });

    it("Should create product B", () => {
        const product = ProductFactory.create("b","Product B", 10);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(20);
        expect(product).toBeInstanceOf(ProductB);
    });

    it("Should throw error when type not suported", () => {
        expect(() => {
            ProductFactory.create("c","Product C", 20)
        }).toThrowError("Type not suported");
    });

})