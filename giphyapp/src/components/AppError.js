import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! Something went wrong.</Text>
      <Text style={styles.description}>
        We're sorry, but an error occurred.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff0000', //
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default AppError;
