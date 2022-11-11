import React from 'react';
import { View, Text, Dimensions, ScrollView, Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Chart = ({ data, labels, type }: { data: any; labels: any; type: string; }) => {

  const onDataClick = (e: any) => {
    Alert.alert('Amount of transactions', `${e.dataset.data[e.index]}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };
  return (
    <ScrollView style={{ height: 300, margin: 'auto' }} contentContainerStyle={{ justifyContent: 'center', margin: 'auto', alignContent: 'center', alignItems: 'center', marginRight: 10 }}>
      {type === 'line' ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data.barChartData
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          onDataPointClick={onDataClick}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

      ) : (
        <PieChart
          data={data.pieChartData}

          width={Dimensions.get("window").width - 30}
          height={250}

          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 10]}
          absolute
        />
      )}

    </ScrollView>
  );
};

export default Chart;
