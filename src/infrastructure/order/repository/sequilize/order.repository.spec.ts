import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import OrderItemModel from "./order_item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import Address from "../../../../domain/customer/value-object/address";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import ProducRepository from "../../../product/repository/sequilize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProducRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["itens"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.getTotal(),
            itens: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: orderItem.productId
            }]
        });

    });

    it("Should update a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProducRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        let order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["itens"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.getTotal(),
            itens: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: orderItem.productId
            }]
        });

        const product2 = new Product("2", "Product 2", 200);

        await productRepository.create(product2);

        const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 3);

        order.changeItens([orderItem, orderItem2]);

        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({
            where: {id: order.id},
            include: ["itens"]
        });
        expect(orderModel2.itens).toHaveLength(2);
        expect(orderModel2.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.getTotal(),
            itens: [{
                        id: orderItem.id,
                        name: orderItem.name,
                        price: orderItem.price,
                        quantity: orderItem.quantity,
                        order_id: order.id,
                        product_id: orderItem.productId
                    },{
                        id: orderItem2.id,
                        name: orderItem2.name,
                        price: orderItem2.price,
                        quantity: orderItem2.quantity,
                        order_id: order.id,
                        product_id: orderItem2.productId
                    }]
        });
    });

    it("Should find a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProducRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["itens"]
        });

        const foundOrder = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.getTotal(),
            itens: [{
                id: foundOrder.itens[0].id,
                name: foundOrder.itens[0].name,
                price: foundOrder.itens[0].price,
                quantity: foundOrder.itens[0].quantity,
                order_id: foundOrder.id,
                product_id: foundOrder.itens[0].productId
            }]
        });

    });

    it("Should find all order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProducRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);


        const product2 = new Product("2", "Product 2", 200);

        await productRepository.create(product2);

        const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 1);

        const order2 = new Order("2", customer.id, [orderItem2]);

        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();
        
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    });

})