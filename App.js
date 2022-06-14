import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';




export default function App() {

  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrival2, setArrival2] = useState("");
  const [bus, setBus] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBus() {
    setLoading(true);
    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      const myBus = responseData.services.filter(
        (service) => service.no === "155"
        )[0];
      console.log("My bus: " + myBus);
      console.log(myBus.no);
      console.log(myBus.next.duration_ms);
      console.log(myBus.subsequent.duration_ms);
      var mins = Math.floor(myBus.next.duration_ms / 60000);
      var sec = ((myBus.next.duration_ms % 60000) / 1000).toFixed(0);
      var mins2 = Math.floor(myBus.subsequent.duration_ms / 60000);
      var sec2 = ((myBus.subsequent.duration_ms % 60000) / 1000).toFixed(0);
      setArrival(mins + " minutes " + sec + " seconds");
      setArrival2(mins2 + " minutes " + sec2 + " seconds");
      setBus(myBus.no);
      setLoading(false);
    }); 
}



useEffect(() => {
  loadBus();
},[]);

useEffect(() => {
  const interval = setInterval(loadBus, 5000);
  return () => clearInterval(interval);
},[]);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Bus Number: { bus } </Text>
      <Text style={styles.title}>Bus Arriving In: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'grey'}/> : arrival} </Text>
      <Text style={styles.title}>Next Bus Arriving In: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'grey'}/> : arrival2} </Text>
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}><Text style={styles.buttonText}>Refresh</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 30,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20, 
  },
  title: {
    fontSize: 30,
    padding: 20,
  },
  arrivalTime: {
    fontSize: 20,
    padding: 20,
  },
  
  
});
