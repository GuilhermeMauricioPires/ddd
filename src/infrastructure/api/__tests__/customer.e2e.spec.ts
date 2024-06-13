import { app, sequilize } from "../express";
import request from 'supertest';

describe("E2E test for customer", () =>{

    beforeEach(async () => {
        await sequilize.sync({force: true});
    })

    afterAll(async () => {
        await sequilize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Guilherme",
                address: {
                    street: "Rua um",
                    city: "FLorianópolis",
                    number: 123,
                    zip: "CEP"
                }
            });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Guilherme");
        expect(response.body.address.street).toBe("Rua um");
        expect(response.body.address.city).toBe("FLorianópolis");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("CEP");            
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Guilherme"                
            });
        expect(response.status).toBe(500);        
    });

    it("should list all customers", async () =>{

        await request(app)
            .post("/customer")
            .send({
                name: "Guilherme",
                address: {
                    street: "Rua um",
                    city: "FLorianópolis",
                    number: 123,
                    zip: "CEP"
                }
            });

        await request(app)
            .post("/customer")
            .send({
                name: "Mauricio",
                address: {
                    street: "Rua dois",
                    city: "São José",
                    number: 456,
                    zip: "CEP dois"
                }
            });

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("Guilherme");
        expect(customer.address.street).toBe("Rua um");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Mauricio");
        expect(customer2.address.street).toBe("Rua dois");

    });

});