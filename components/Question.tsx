import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Question({
  data,
  onSubmitAnswer,
  isCorrect, // Controlled from parent
  isGameOver,
  attemptNumber
}: {
  data: { question: string };
  onSubmitAnswer: (answer: string) => void;
  isCorrect?: boolean;
  isGameOver?: boolean;
  attemptNumber: number
}) {
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    // Whenever there's a new submission attempt, clear the input if the answer is incorrect
    if (isCorrect === false) {
      setUserAnswer('');
    }
  }, [attemptNumber]);
4
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{data.question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={setUserAnswer}
        editable={!isGameOver && isCorrect !== true} // Only editable if hasn't been answered correctly
      />
      <Button 
        title="Submit" 
        onPress={() => {
          if (userAnswer.trim()) { // Ensure there's input
            onSubmitAnswer(userAnswer.trim());
          }
        }} 
        disabled={!isGameOver && isCorrect === true} // Disable if answered correctly
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
