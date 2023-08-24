export default interface OrderFactoryInterface {
    customerId: string,
    itens: {
        productId: string,
        name: string,
        price: number,
        quantity: number
    }[]
}