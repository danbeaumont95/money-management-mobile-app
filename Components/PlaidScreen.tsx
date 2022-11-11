import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions, Button } from 'react-native';
import PlaidHome from './PlaidHome';

const height = Dimensions.get('window').height;

const PlaidLink = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={{ top: 50 }}>

        <Button
          title="Back to login"
          onPress={() =>
            navigation.navigate('Home', { name: 'Jane' })
          }
        />
        <Button
          title="Back to main"
          onPress={() =>
            navigation.navigate('Main', { name: 'Jane' })
          }
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Link your bank accounts</Text>
        <Text style={styles.text}>By clicking the below button, you will be taken through our open banking service providers (Plaid) pop up web app. This is fully secure, and has all the UK's major banking companies for you to link all of your bank accounts to Dans Money.</Text>

        <ScrollView>
          <Image source={require('../assets/PlaidLink.png')} />
        </ScrollView>

        <PlaidHome navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default PlaidLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    marginTop: 30,
    fontSize: 20,
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FC0086',

    height: 60,
    width: 270,
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
