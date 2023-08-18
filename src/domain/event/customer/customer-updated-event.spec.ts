import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerUpdatedEvent from "./customer-updated.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer updated events tests", () =>{

    it("should register an customer updated event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toEqual([eventHandler]);

    });

    it("should notify all customer updated event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toEqual([eventHandler]);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1000, "Zip 1", "City 1");
        customer.changeAddress(address);

        const address2 = new Address("Street 9", 99999, "Zip 9", "City 9");
        customer.changeAddress(address2);

        const customerUpdatedEvent = new CustomerUpdatedEvent(customer);

        eventDispatcher.notify(customerUpdatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();

    });

})