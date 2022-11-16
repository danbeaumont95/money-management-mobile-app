import { View, Text, Alert, StyleSheet, ScrollView, Button } from "react-native";
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import UserService from "../Services/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Chart from "./Chart";
import Transaction from "./Transaction";
import { TransactionInterface, IArrayOfStrings, PaymentMeta } from '../Services/interfaces';
import TransactionFilters from "./TransactionFilters";
import SwipeUpDown from 'react-native-swipe-up-down';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BackgroundComponent from "./BackgroundComponent";

const Main = ({ navigation }) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  const [transactions, setTransactions] = useState<Array<TransactionInterface>>([]);

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
          }
        }
      })
      .catch((err) => {
        console.log(err, 'err in getTransactions');
        setShowLoadingSpinner(false);
      });
  }, []);
  useEffect(() => {
    setShowLoadingSpinner(true);
    getTransactions();
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

  // const snapPoints = useMemo(() => ["100%", "150%", "200%"], []);
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  if (!transactions.length) return <View><Text>Loading...</Text></View>;
  return (
    <View style={{ display: 'flex', backgroundColor: '#1A1C46' }}>
      <View style={{ zIndex: 1 }}>

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
        <TransactionFilters />
      </View>
      <ScrollView style={{ marginTop: 20 }}>

        <View style={styles.container}>
          <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
          <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
          <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
          <Button title="Close" onPress={() => handleClosePress()} />
          <View></View>
          <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            backgroundComponent={BackgroundComponent}
          >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>

              {transactions.map((el) => (
                <Transaction transaction={el} />
              ))}

            </BottomSheetScrollView>
          </BottomSheet>
        </View>

      </ScrollView>
    </View>
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
    zIndex: 1000000,
    backgroundColor: "#1A1C46",
    paddingBottom: 0,
    marginBottom: 0
  },
  contentContainer: {
    backgroundColor: "#1A1C46",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#1A1C46",
  },
});
