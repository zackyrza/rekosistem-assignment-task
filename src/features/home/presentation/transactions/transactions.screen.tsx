import React from 'react';

import {FlatList, Text, View} from 'react-native';

import styles from './transactions.styles';
import {useHomeService} from '../../../application';
import {ITransaction} from '../../application/home_mapper';

export default function TransactionsScreen() {
  const {getTransactions} = useHomeService();

  const [refreshing, setRefreshing] = React.useState(false);
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);

  const handleGetTransactions = () => {
    setRefreshing(true);
    getTransactions().then(transactions => {
      setRefreshing(false);
      setTransactions(transactions);
    });
  };

  React.useEffect(handleGetTransactions, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={transactions}
        onRefresh={handleGetTransactions}
        refreshing={refreshing}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.id}</Text>
            <View style={styles.itemColumn}>
              <Text style={styles.itemText}>
                Nama produk: {item.product?.name}
              </Text>
              <Text style={styles.itemText}>Point: {item.price?.points}</Text>
              <Text style={styles.itemText}>Quantity: {item.total}</Text>
              <Text style={styles.itemText}>Total Point: {item.points}</Text>
              <Text style={styles.itemText}>User: {item.user?.name}</Text>
              <Text style={[styles.itemText, {color: item.type?.color}]}>
                Tipe: {item.type?.name}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
