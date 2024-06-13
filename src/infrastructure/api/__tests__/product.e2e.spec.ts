import { app, sequilize } from "../express";
import request from 'supertest';

describe("E2E test for product", () =>{

    beforeEach(async () => {
        await sequilize.sync({force: true});
    })

    afterAll(async () => {
        await sequilize.close();
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: 'a',
                name: "produto um",
                price: 100
            });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("produto um");
        expect(response.body.price).toBe(100);        
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: 'c',
                name: "produto um",
                price: 100
            });
        expect(response.status).toBe(500);        
    });

    it("should list all products", async () =>{

        await request(app)
            .post("/product")
            .send({
                type: 'a',
                name: "produto um",
                price: 100
            });

        await request(app)
            .post("/product")
            .send({
                type: 'a',
                name: "produto dois",
                price: 200
            });

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("produto um");
        expect(product.price).toBe(100);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("produto dois");
        expect(product2.price).toBe(200);

    });

});