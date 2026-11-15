export interface UserData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
}

export interface TestDataStructure {
    signingupValidData: UserData;
    signingupInvalidData: UserData;
}