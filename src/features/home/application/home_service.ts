import {useHomeRepository} from "../../domain";
import { mapToTransactionList } from "./home_mapper";

export default function useHomeService() {
    const { getPricesData, getProductData, getTransactionsData, getTypesData, getUserData } = useHomeRepository();

    async function getTransactions() {
        const transactions = await getTransactionsData();
        const users = await getUserData();
        const prices = await getPricesData();
        const types = await getTypesData();
        const products = await getProductData();
        return mapToTransactionList(transactions, users, prices, types, products);
    }

    return {
        getTransactions,
    };
}
