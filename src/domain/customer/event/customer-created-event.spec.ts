import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../../customer/value-object/address";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Customer created events tests", () =>{

    it("should register an customer created event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const event1Handler = new EnviaConsoleLog1Handler();
        const event2Handler = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerCreatedEvent", event2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toEqual([event1Handler, event2Handler]);

    });

    it("should notify all customer created event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const event1Handler = new EnviaConsoleLog1Handler();
        const event2Handler = new EnviaConsoleLog2Handler();

        
        const spyEvent1Handler = jest.spyOn(event1Handler, "handle");
        const spyEvent2Handler = jest.spyOn(event2Handler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerCreatedEvent", event2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toEqual([event1Handler, event2Handler]);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1000, "Zip 1", "City 1");
        customer.changeAddress(address);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEvent1Handler).toHaveBeenCalled();
        expect(spyEvent2Handler).toHaveBeenCalled();

    });

})