import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "Guilherme");
const address = new Address("Rua a", 2, "8888888", "Florianópolis");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("11", "Item 1", 10);
const item2 = new OrderItem("22", "Item 2", 20);

const order = new Order("111", "1", [item1, item2]);