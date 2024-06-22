import { AddressModel } from "./address.model";
import { Status } from "./enums/start.enum";


export type ProviderModel = {
    id?: number;
    providerName?: string;
    address?: AddressModel;
    phoneNumber?: string;
    email?: string;
    status?: Status;
}