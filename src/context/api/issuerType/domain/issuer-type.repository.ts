
import { IssuerType } from "./issuer-type.model";

export abstract class IssuerTypeRepository {
    abstract create(data: IssuerType): Promise<IssuerType>;
    abstract findAll(): Promise<IssuerType[]>;
    abstract findOne(id: number): Promise<IssuerType | null>;
    abstract update(id: number, data: IssuerType): Promise<IssuerType | null>;
    abstract delete(id: number): Promise<void>;
}
