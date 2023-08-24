import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.getTotal(),
            itens: entity.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        }, {
            include: [{model: OrderItemModel}]
        });
    }
    
    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
              where: { order_id: entity.id},
              transaction: t,
            });
            const itens = entity.itens.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
              order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(itens, { transaction: t });
            await OrderModel.update(
              { total: entity.getTotal() },
              { where: { id: entity.id }, transaction: t }
            );
          });
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({where: {id}, rejectOnEmpty: false, include: [{model: OrderItemModel}]});
        const itens = orderModel.itens.map((item) => (
            new OrderItem(item.id, item.product_id, item.name, item.price,item.quantity)
        ));
        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            itens
        )
        return order;
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({include: [{model: OrderItemModel}]});
        const orders = ordersModel.map((orderModel) => {
            const itens = orderModel.itens.map((item) => (
                new OrderItem(item.id, item.product_id, item.name, item.price,item.quantity)
            ));
            const order = new Order(
                orderModel.id,
                orderModel.customer_id,
                itens
            )
            return order;
        });
        return orders;
    }

    
}