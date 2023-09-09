import firestore from '@react-native-firebase/firestore';

interface IDynamicObject {
    [key: string]: any;
}

export default function useFirestoreService() {
    function getCollection(collection: string): Promise<IDynamicObject[]> {
        return firestore().collection(collection).get().then((querySnapshot) => {
            const data: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                data.push(documentSnapshot.data());
            });
            return data;
        });
    }

    function getDocument(collection: string, document: string): IDynamicObject {
        return firestore().collection(collection).doc(document).get().then((documentSnapshot) => {
            if (!documentSnapshot.exists) {
                return {};
            }
            return documentSnapshot.data();
        });
    }

    function addDocument(collection: string, document: string, data: any) : Promise<void> {
        return firestore().collection(collection).doc(document).set(data);
    }

    function updateDocument(collection: string, document: string, data: any) : Promise<void> {
        return firestore().collection(collection).doc(document).update(data);
    }

    function deleteDocument(collection: string, document: string) : Promise<void> {
        return firestore().collection(collection).doc(document).delete();
    }

    function addTemplateData() : void {
        const types = [{id: '1', name: 'PET', color: '#567BB9'}, {id: '2', name: 'HDPE', color: '#C7D3E8',}];
        const product = [{ id: '1', name: 'Botol Kaleng', typeId: '2' }, { id: '2', name: 'Botol Aqua', typeId: '1' }];
        const user = [{ id: '121d', name: 'aga', age: 12 }, { id: '212 f', name: 'dean', age: 22, }];
        const prices = [{ id: '1', points: 1000, productId: '1' }, { id: '2', points: 3000, productId: '2' }];
        const transactions = [{ id: '132', userId: '121d', productId: '2', total: 2 }, { id: '122', userId: '212f', productId: '1', total: 4, }];
        
        types.forEach((type) => {
            addDocument('types', type.id, type);
        });

        product.forEach((product) => {
            addDocument('products', product.id, product);
        });

        user.forEach((user) => {
            addDocument('users', user.id, user);
        });

        prices.forEach((price) => {
            addDocument('prices', price.id, price);
        });

        transactions.forEach((transaction) => {
            addDocument('transactions', transaction.id, transaction);
        });
    }

    return {
        getCollection,
        getDocument,
        addDocument,
        updateDocument,
        deleteDocument,
        addTemplateData,
    };
}