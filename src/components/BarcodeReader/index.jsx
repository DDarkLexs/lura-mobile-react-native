import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Camera, BarcodeScanner } from 'react-native-vision-camera';

const BarcodeScannerScreen = () => {
  const [scannedData, setScannedData] = useState('');

  const handleBarcodeScanned = ({ barcodes }) => {
    if (barcodes.length > 0) {
      setScannedData(barcodes[0].data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera>
        <BarcodeScanner
          onCodeScanned={handleBarcodeScanned}
          style={{ flex: 1 }}
        />
      </Camera>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Text>Scanned Data: {scannedData}</Text>
      </View>
    </View>
  );
};

export default BarcodeScannerScreen;