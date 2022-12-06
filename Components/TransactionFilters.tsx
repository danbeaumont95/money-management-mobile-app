import React from 'react';
import { View, Pressable, Text, StyleSheet } from "react-native";

const TransactionFilters = ({ onDayClick, onWeekClick, onMonthClick, onInboundClick, onAllClick, onOutboundClick, date, inboundOutbound }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timePeriodContainer}>

        <Pressable style={date === 'day' ? styles.activeButton : styles.button} onPress={onDayClick}>
          <Text style={styles.text}>Day</Text>
        </Pressable>
        <Pressable style={date === 'week' ? styles.activeButton : styles.button} onPress={onWeekClick}>
          <Text style={styles.text}>Week</Text>
        </Pressable>
        <Pressable style={date === 'month' ? styles.activeButton : styles.button} onPress={onMonthClick}>
          <Text style={styles.text}>Month</Text>
        </Pressable>
      </View>
      <View style={styles.timePeriodContainer}>

        <Pressable style={inboundOutbound === 'inbound' ? styles.activeButton : styles.button} onPress={onInboundClick}>
          <Text style={styles.text}>Inbound</Text>
        </Pressable>
        <Pressable style={inboundOutbound === 'all' ? styles.activeButton : styles.button} onPress={onAllClick}>
          <Text style={styles.text}>All</Text>
        </Pressable>
        <Pressable style={inboundOutbound === 'outbound' ? styles.activeButton : styles.button} onPress={onOutboundClick}>
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
  },
  activeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 1,
    backgroundColor: '#5224D8',
    height: 50,
    marginTop: 20,
    flexBasis: '25%',
    position: 'relative',
    zIndex: 1,
  },
});
