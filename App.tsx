import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './components/StartScreen';
import TriviaGame from './components/TriviaGame';
import ResultScreen from './components/ResultsScreen';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; correctAnswer: string; userAnswer: string }[]>([]);

  return (
    <View style={styles.container}>
      {gameState === 'start' && <StartScreen onStart={() => setGameState('playing')} />}
      {gameState === 'playing' && (
        <TriviaGame
          onFinish={(finalScore: any, finalAnswers: any) => {
            setScore(finalScore);
            setAnswers(finalAnswers);
            setGameState('results');
          }}
        />
      )}
      {gameState === 'results' && <ResultScreen score={score} answers={answers} onRestart={() => setGameState('start')} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
