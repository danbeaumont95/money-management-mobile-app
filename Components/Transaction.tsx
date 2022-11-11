import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { TransactionInterface } from '../Services/interfaces';
import { FontAwesome } from '@expo/vector-icons';
import categories from '../Services/plaid_categories';
import getSymbolFromCurrency from 'currency-symbol-map';
import MyTabs from './Tabs';

const Transaction = ({ transaction }: { [key: string]: TransactionInterface; }) => {

  const upperCaseFirstLetter = string =>
    `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

  const lowerCaseAllWordsExceptFirstLetters = string =>
    string.replaceAll(/\S*/g, word =>
      `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
    );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={{
          backgroundColor: '#BF7DD3', shadowRadius: 8, borderRadius: 10, justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '50%',
          width: '80%'
        }}>

          <FontAwesome name={categories.categories.filter((el) => el.category_id === transaction.category_id)[0].icon ?? 'random'} size={30} color="#4B0D60" />
        </View>

      </View>
      <View style={styles.center}>

        <Text style={{ fontSize: 18, color: '#CBD3F7' }}>{upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(transaction.name))}</Text>
        <Text style={{ color: '#CBD3F7' }}>{transaction.payment_channel}</Text>
      </View>
      <View style={styles.right}>

        <Text style={{ fontSize: 20, color: '#CBD3F7' }}>{getSymbolFromCurrency(transaction.iso_currency_code)}{transaction.amount.toString().indexOf('.') > 0 ? transaction.amount.toFixed(2) : transaction.amount}</Text>
      </View>
    </View>
  );
};


export default Transaction;

const styles = StyleSheet.create({
  container: {
    color: '#FFF',
    // backgroundColor: 'red',
    height: 100,
    borderBottomColor: 'grey',
    // borderTopColor: 'red',
    borderWidth: 2,
    // paddingBottom: 10,
    marginBottom: 10,
    width: Dimensions.get("window").width,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 4,
    // alignItems: 'stretch',
    // justifyContent: 'space-around',
    // backgroundColor: '#'
  },
  left: {
    // borderColor: 'black',
    // borderWidth: 2,
    // flexGrow: 1,
    // flexShrink: 1,
    flexBasis: '15%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  center: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    // flexGrow: 2,
    // textAlign: 'center',
    flexBasis: '65%',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'left',
    textAlign: 'center',
    paddingRight: 14,
    paddingLeft: 10
  },
  right: {
    // borderColor: 'green',
    // borderWidth: 2,
    // flexGrow: 1,
    flexBasis: '20%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});
