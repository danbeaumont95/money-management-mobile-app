import { View, Text, Alert, StyleSheet, ScrollView, Button } from "react-native";
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import UserService from "../Services/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Chart from "./Chart";
import Transaction from "./Transaction";
import { TransactionInterface, IArrayOfStrings, PaymentMeta, FormattedDate } from '../Services/interfaces';
import TransactionFilters from "./TransactionFilters";
import SwipeUpDown from 'react-native-swipe-up-down';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BackgroundComponent from "./BackgroundComponent";

const Main = ({ navigation }) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  const [transactions, setTransactions] = useState<Array<TransactionInterface>>([]);
  const [snapScore, setSnapScope] = useState(1);
  const [scrollingDraw, setScrollingDraw] = useState(false);
  const [inboundOutbound, setInboundOutbound] = useState('all');
  const [formattedDates, setFormattedDates] = useState([]);
  const [buttonChangeLoading, setButtonChangeLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [date, setDate] = useState('week');

  const getTransactions = useCallback(async () => {
    const token = await AsyncStorage.getItem('access_token');

    await UserService.getAllTransactions(token, 'month')
      .then((res) => {
        if (res.data.error) {
          setShowLoadingSpinner(false);
          Alert.alert(`Error`, res.data.error, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);

          navigation.navigate('PlaidLink', { name: 'Jane' });
        }
        else {
          if (res.data.transactions) {
            setShowLoadingSpinner(false);
            setTransactions(res.data.transactions);
            setFormattedDates(formatTransactionsByDate(res.data.transactions));
          }
        }
      })
      .catch((err) => {
        console.log(err, 'err in getTransactions');
        setShowLoadingSpinner(false);
      });
  }, []);

  const getAccessToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
    }
  };
  useEffect(() => {
    setShowLoadingSpinner(true);
    getTransactions();
    getAccessToken();
  }, []);

  const getAmountSpentPerAmount = (arr: Array<TransactionInterface>) => {
    const obj = {
      lessThan5: 0,
      lessThan10: 0,
      lessThan20: 0,
      lessThan30: 0,
      '30Plus': 0,
    };
    const getAmount = (arr, number) => {
      return arr.filter((el) => el.amount <= number).length;
    };
    const allLessThan5 = getAmount(arr, 5);

    const allLessThan10 = getAmount(arr, 10);

    const allLessThan20 = getAmount(arr, 20);

    const allLessThan30 = getAmount(arr, 30);
    const allAbove = arr.filter((el) => el.amount > 30).length;

    obj.lessThan5 = allLessThan5;
    obj.lessThan10 = allLessThan10;
    obj.lessThan20 = allLessThan20;
    obj.lessThan30 = allLessThan30;
    obj['30Plus'] = allAbove;

    const colourIndexLookup = {
      0: '#7FFF00',
      1: '#A09000',
      2: 'yellow',
      3: 'orange',
      4: 'red'
    };
    const pieChartData = Object.entries(obj).map((el, i) => {

      return {
        'name': el[0],
        'amount': el[1],
        color: colourIndexLookup[i],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      };
    });

    return { barChartData: Object.values(obj), pieChartData };
  };

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "150%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    setSnapScope(index);
    setScrollingDraw(false);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleBottomScrollViewScroll = () => {
  };

  const handleBottomScrollViewScrollEndDrag = () => {
  };

  const bottom = () => {
    setScrollingDraw(true);
  };

  const formatTransactionsByDate = (arr: Array<TransactionInterface>) => {
    const result = arr.reduce(
      (
        transaction: any,
        {
          date,
          pending,
          account_id,
          amount,
          category,
          name,
          merchant_name,
          transaction_code,
          transaction_type,
          payment_channel,
          iso_currency_code,
          category_id
        }: {
          date: string;
          pending: boolean,
          account_id: string,
          amount: number,
          category: IArrayOfStrings,
          name: string,
          merchant_name: string,
          transaction_code: string,
          transaction_type: string,
          payment_channel: string,
          iso_currency_code: string;
          category_id: string;
        },
      ) => {
        let match = transaction.find((e: any) => e.date === date);
        if (match) {
          match.data.push({
            pending,
            account_id,
            amount,
            category,
            name,
            merchant_name,
            transaction_code,
            transaction_type,
            payment_channel,
            iso_currency_code,
            category_id
          });
        } else {
          match = {
            date,
            data: [
              {
                pending,
                account_id,
                amount,
                category,
                name,
                merchant_name,
                transaction_code,
                transaction_type,
                payment_channel,
                iso_currency_code,
                category_id
              },
            ],
          };
          transaction.push(match);
        }
        return transaction;
      },
      [],
    );
    return result;
  };

  const onInboundClick = () => {

    const mappedTransactions = transactions.filter((el) => el.amount < 0);

    setFormattedDates(formatTransactionsByDate(mappedTransactions));

    setInboundOutbound('inbound');
  };

  const onAllClick = () => {

    setFormattedDates(formatTransactionsByDate(transactions));

    setInboundOutbound('all');
  };

  const onOutboundClick = () => {

    const mappedTransactions = transactions.filter((el) => el.amount > 0);

    setFormattedDates(formatTransactionsByDate(mappedTransactions));

    setInboundOutbound('outbound');
  };

  const onDayClick = () => {

    setButtonChangeLoading(true);
    setShowLoadingSpinner(true);

    UserService.getAllTransactions(accessToken, 'day')
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.data.transactions) {
          setTransactions(res.data.transactions);
          setFormattedDates(formatTransactionsByDate(res.data.transactions));
          setDate('day');
          setShowLoadingSpinner(false);
          setButtonChangeLoading(false);
          setShowLoadingSpinner(false);

        } else {

          Alert.alert('Error', res.data.error, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      });
  };

  const onWeekClick = () => {
    setShowLoadingSpinner(true);
    setButtonChangeLoading(true);
    UserService.getAllTransactions(accessToken, 'week')
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.data.transactions) {
          setTransactions(res.data.transactions);
          setFormattedDates(formatTransactionsByDate(res.data.transactions));
          setDate('week');
          setButtonChangeLoading(false);
          setShowLoadingSpinner(false);

        } else {

          Alert.alert('Error', res.data.error, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      });
  };

  const onMonthClick = () => {
    setShowLoadingSpinner(true);
    setButtonChangeLoading(true);
    UserService.getAllTransactions(accessToken, 'month')
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.data.transactions) {
          setTransactions(res.data.transactions);
          setFormattedDates(formatTransactionsByDate(res.data.transactions));
          setDate('month');
          setButtonChangeLoading(false);
          setShowLoadingSpinner(false);

        } else {
          Alert.alert('Error', res.data.error, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      });
  };

  if (!transactions.length) return <View><Text>Loading...</Text></View>;

  return (
    <View style={{ display: 'flex', backgroundColor: '#1A1C46' }}>
      <View style={scrollingDraw ? { display: 'none' } : { zIndex: 1, elevation: 1, position: 'absolute' }}>

        <Spinner
          visible={showLoadingSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          overlayColor={'rgba(00, 0, 0, 0.6)'}
        />
        <Text style={{ color: '#CBD3F7', fontSize: 30, top: 50, margin: 'auto', textAlign: 'center' }}>Transactions</Text>
        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 'auto', height: 340, marginBottom: 0, paddingBottom: 0 }}>
          <View style={{ display: 'flex', marginBottom: 0, paddingBottom: 0, top: 20 }}>

            <Chart data={getAmountSpentPerAmount(transactions)} labels={['Less than £5', '£5-£10', '£10-£20', '£20-£30', '£30+']} type='pie' />
          </View>
        </View>
        <TransactionFilters onDayClick={onDayClick} onWeekClick={onWeekClick} onMonthClick={onMonthClick} onInboundClick={onInboundClick} onAllClick={onAllClick} onOutboundClick={onOutboundClick} date={date} inboundOutbound={inboundOutbound} />
      </View>
      <ScrollView style={snapScore === 2 ? { zIndex: 9999 } : { marginTop: 20, position: 'relative', }} onScroll={handleBottomScrollViewScroll} onScrollEndDrag={handleBottomScrollViewScrollEndDrag}>

        <View style={styles.container}>

          <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            backgroundComponent={BackgroundComponent}
          >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer} onScroll={bottom}>

              {formattedDates.map((el: any) => (
                el.data.map((els) => (

                  <Transaction transaction={els} />
                ))
              ))}

            </BottomSheetScrollView>
          </BottomSheet>
        </View>

      </ScrollView>
    </View >
  );
};

export default Main;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    paddingTop: 300,
    position: 'relative',
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: "#1A1C46",
    paddingBottom: 0,
    marginBottom: 0,

    height: 1000,

    backfaceVisibility: 'hidden'
  },
  contentContainer: {
    backgroundColor: "#1A1C46",

    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#1A1C46",
  },
});
