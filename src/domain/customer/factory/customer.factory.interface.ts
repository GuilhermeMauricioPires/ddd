export default interface CustomerFactoryInterface {
    name: string,
    address?: {
        street?: string,
        number?: number,
        zip?: string,
        city?: string
    }
}