import useFirestoreService from "../../../services/remote/firestore";

export interface ITypes {
    id: string;
    name: string;
    color: string;
}

export interface IProduct {
    id: string;
    name: string;
    typeId: string;
}

export interface IUser {
    id: string;
    name: string;
    age: number;
}

export interface IPrices {
    id: string;
    points: number;
    productId: string;
}

export interface ITransactions {
    id: string;
    userId: string;
    productId: string;
    total: number;
}

export default function useHomeRepository() {
    const { getCollection, addTemplateData } = useFirestoreService();

    function getTypesData(): Promise<ITypes[]> {
        return getCollection("types") as Promise<ITypes[]>;
    }

    function getProductData() : Promise<IProduct[]> {
        return getCollection("products") as Promise<IProduct[]>;
    }

    function getUserData() : Promise<IUser[]> {
        return getCollection("users") as Promise<IUser[]>;
    }

    function getPricesData() : Promise<IPrices[]> {
        return getCollection("prices") as Promise<IPrices[]>;
    }

    function getTransactionsData() : Promise<ITransactions[]> {
        return getCollection("transactions") as Promise<ITransactions[]>;
    }

    function addData() : void {
        return addTemplateData();
    }

    return {
        getTypesData,
        getProductData,
        getUserData,
        getPricesData,
        getTransactionsData,
        addData,
    };
}