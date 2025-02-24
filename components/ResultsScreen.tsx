import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function ResultScreen({ score, answers, onRestart }: { score: number, answers: any[], onRestart: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.score}>Final Score: {score} / 10</Text>
      <FlatList
        data={answers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.answer}>
            {item.question} - Correct: {item.correctAnswer} | Your Answer: {item.userAnswer}
          </Text>
        )}
      />
      <Button title="Play Again" onPress={onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 5,
  },
});
