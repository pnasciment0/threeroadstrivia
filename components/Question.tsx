import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Question({
  data,
  onSubmitAnswer,
  isAnswered,
}: {
  data: { question: string };
  onSubmitAnswer: (answer: string) => void;
  isAnswered?: boolean; // Use boolean instead of string for clarity
}) {
  const [userAnswer, setUserAnswer] = useState('');

  // console.log(data, isAnswered);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{data.question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={setUserAnswer}
        editable={isAnswered !== true} // Disable if answered correctly
      />
      <Button 
        title="Submit" 
        onPress={() => {
          if (userAnswer.trim()) { // Ensure there's input
            onSubmitAnswer(userAnswer.trim());
            setUserAnswer(''); // Clear input after submit
          }
        }} 
        disabled={isAnswered === true} // Disable if answered correctly
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
