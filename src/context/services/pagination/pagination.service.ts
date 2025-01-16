import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class PaginationService {
    paginate<T>(data: T[], total: number, page: number, limit: number): { data: T[], total: number, nextPage: number | null, prevPage: number | null, limit: number } {
        const nextPage = (page * limit) < total ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        return { data, total, nextPage, prevPage, limit };
    }
}