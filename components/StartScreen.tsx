import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Trivia Game!</Text>
      <Text style={styles.subtitle}>Press "Start" when you're ready.</Text>
      <Button title="Start" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});
