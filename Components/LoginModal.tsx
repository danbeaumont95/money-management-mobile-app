import React from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

interface LoginModalInterface {
  isModalVisible: boolean;
  setModalVisible: any;
  modalText: string;
}

function LoginModal({ isModalVisible, setModalVisible, modalText }: LoginModalInterface) {

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={isModalVisible ? { flex: 1, height: 200, width: width * .9, backgroundColor: modalText === 'Logged in!' ? 'green' : 'red', borderRadius: 20 } : { display: 'none' }}>

      <Modal isVisible={isModalVisible} >
        <View style={{ flex: 1, top: 210 }}>
          <Text style={{ color: 'white', top: -10, left: 320 }}>X</Text>
          <Button title={`${modalText}`} onPress={toggleModal} color={'white'} />
        </View>
      </Modal>
    </View>
  );

}

export default LoginModal;
