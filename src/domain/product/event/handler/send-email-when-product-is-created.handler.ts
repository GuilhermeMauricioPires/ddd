import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProducIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{
    handle(event: EventInterface): void {
        console.log("***MAGICA ACONTECENDO*** Enviando email....");
    }
}