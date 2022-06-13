import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';


export default function App() {

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time: </Text>
      <Text style={styles.arrivalTime}> {loading ? <ActivityIndicator color={'pink'}/> : "Loaded"} </Text>
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}><Text>Refresh</Text></TouchableOpacity>
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
    padding: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  arrivalTime: {
    fontSize: 30,
    padding: 20,
  },
  
});
