import { IPrices, IProduct, ITransactions, ITypes, IUser } from "../domain/home_repository";

export interface ITransaction {
    id: string;
    userId: string;
    productId: string;
    total: number;
    points: number;
    user?: IUser;
    product?: IProduct;
    price?: IPrices;
    type?: ITypes;
}

export function mapToTransactionList(transactions: ITransactions[], users: IUser[], prices: IPrices[], types: ITypes[], products: IProduct[]) {
    const mappedTransactions: ITransaction[] = [];

    transactions.forEach((transaction) => {
        const user = users.find((user) => user.id === transaction.userId);
        const product = products.find((product) => product.id === transaction.productId);
        const price = prices.find((price) => price.productId === transaction.productId);
        const type = types.find((type) => type.id === product?.typeId);
        const currentPoints: number = price?.points as number;
        const points = currentPoints * transaction.total;
        mappedTransactions.push({
            id: transaction.id,
            userId: transaction.userId,
            productId: transaction.productId,
            total: transaction.total,
            user: user,
            product: product,
            price: price,
            type: type,
            points: points,
        });
    });

    return mappedTransactions;
}