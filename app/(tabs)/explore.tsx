import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";

export default function App() {
  //// invalid , valid, used
  const [hasPermission, setHasPermission] = useState(null);
  const [qrStatus, setQrStatus] = useState("");
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const getCameraPermissions = async () => {
       
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  
  const qrExist = (data :string) => {
    if(data == "1729975045423x894634611968820500"){

      return true;
    }
   
    else return false
  }
  const handleBarcodeScanned = ({ type, data }: any) => {
    setScanned(true);
   if(qrExist(data)){
    setQrStatus("valid");
   }
   else setQrStatus("invalid");
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

 const getColor = () =>{

 }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return     <View style={styles.container}>
    <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    <Button onPress={requestPermission}  title="grant permission" />
  </View>
  }


  return (
    <View style={styles.container}>

      <Text>EventHub</Text>

      <View style={[styles.cameraWrapper, qrStatus == "valid" && styles.cameraValid, qrStatus == "invalid" && styles.cameraInvalid, qrStatus == "used" && styles.cameraUsed]}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          // barcodeScannerSettings={{
          //   barcodeTypes: ["qr", "pdf417"],
          // }}
          style={styles.camera}
        />

      </View>
    
      {/* {scanned && ( */}
        <Button title={"Tap to Scan"} onPress={() => setScanned(false)} />
       {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center"
  },
  cameraWrapper: {
    width: "70%",
    height: "40%",
    borderRadius: 100 / 2,
    backgroundColor:"gray",
    position:"relative",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center"
  },
  cameraValid: {
    width: "70%",
    height: "40%",
    borderRadius: 100 / 2,
    backgroundColor:"green",
    position:"relative",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center"
  },
  cameraInvalid: {
    width: "70%",
    height: "40%",
    borderRadius: 100 / 2,
    backgroundColor:"red",
    position:"relative",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center"
  },
  cameraUsed: {
    width: "70%",
    height: "40%",
    borderRadius: 100 / 2,
    backgroundColor:"yellow",
    position:"relative",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center"
  },
camera:{
  width:"80%",
  height:"80%",
  position: "absolute"

}
});