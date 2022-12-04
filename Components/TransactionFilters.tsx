import React from 'react';
import { View, Pressable, Text, Alert, StyleSheet, ScrollView } from "react-native";

const TransactionFilters = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timePeriodContainer}>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Day</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Week</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Month</Text>
        </Pressable>
      </View>
      <View style={styles.timePeriodContainer}>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Inbound</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>All</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Outbound</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TransactionFilters;

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    position: 'relative',
    zIndex: -2
  },
  timePeriodContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center'
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 1,
    elevation: 1,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 1,
    backgroundColor: '#FC0086',
    height: 50,
    marginTop: 20,
    flexBasis: '25%',
    position: 'relative',
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
