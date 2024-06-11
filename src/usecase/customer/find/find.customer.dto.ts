export interface InputFindCustomerDto {
    id: string;
}

export interface OututFindCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string
    };
}