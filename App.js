import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';




export default function App() {

  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBus() {
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
      console.log(myBus.next.time);
      setArrival(myBus.next.time);
      setLoading(false);
    }); 
}

useEffect(() => {
  loadBus();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'grey'}/> : arrival} </Text>
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
  },
  arrivalTime: {
    fontSize: 40,
    padding: 20,
  },
  
  
});
