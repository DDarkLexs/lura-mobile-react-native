import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const BarcodeScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const cameraRef = useRef(null);

  const handleBarcodeRead = (event) => {
    if (event.data) {
      setBarcodeData(event.data);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        onBarCodeRead={handleBarcodeRead}
      />
      {barcodeData && (
        <View style={styles.barcodeDataContainer}>
          <Text style={styles.barcodeDataText}>{barcodeData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  barcodeDataContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  barcodeDataText: {
    color: 'white',
    fontSize: 16,
  },
});