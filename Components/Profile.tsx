
import { View, Text } from 'react-native';
import LoginModal from './LoginModal';
import React, { useState } from 'react';

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Text style={{ borderColor: 'red', borderWidth: 6, height: 200 }}>Dann</Text>
      {/* <LoginModal setModalVisible={setModalVisible} isModalVisible={true} modalText={'Logged in!'} /> */}
    </View>
  );
};

export default Profile;
