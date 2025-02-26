import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Question from './Question';

const sampleQuestions = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'Who wrote "Hamlet"?', answer: 'Shakespeare' },
  // Add more questions up to 10
];

export default function TriviaGame({ onFinish }: { onFinish: (score: number, answers: any[]) => void }) {
  const [answers, setAnswers] = useState<{ question: string; correctAnswer: string; userAnswer: string }[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: { correct: boolean | undefined, attemptNumber: number } }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store interval ID
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, []);
  

  useEffect(() => {
    if (score === sampleQuestions.length) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      onFinish(score, answers)
    }
  }, [score])

  const handleAnswer = (questionIndex: number, userInput: string) => {  
    console.log(`handleAnswer detected! input is ${userInput}`);

    const currentAttempts = answeredQuestions[questionIndex]?.attemptNumber || 0;
    // Only proceed if the question hasn't been answered correctly yet
    if (answeredQuestions[questionIndex]?.correct === true) return;

    console.log("not returning because question has not been answered correctly");
  
    const currentQuestion = sampleQuestions[questionIndex];
    const isCorrect = userInput.toLowerCase() === currentQuestion.answer.toLowerCase();
  
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionIndex]: { 
        correct: isCorrect,
        attemptNumber: currentAttempts + 1
       }, // Store if the answer was correct
    }));
  
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, correctAnswer: currentQuestion.answer, userAnswer: userInput },
    ]);
  
    // Update score only if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    // console.log(`questionIndex: ${questionIndex} | userInput ${userInput} | answeredQuestions ${answeredQuestions} | sampleQuestions ${sampleQuestions}`)

  };

  const handleGiveUp = () => {
    setGameOver(true);
    console.log("Give up pressed");
    console.log(`gameOver is set to ${gameOver}`);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; // Prevent further clears
    }
    onFinish(score, answers);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.timer}>Time: {timer} sec</Text> */}
      {/* <Text>Time: {timer} sec</Text> */}
      {/* <View>
        <Text style={styles.timer}>Time: {timer} sec</Text>
      </View> */}
      <ScrollView style={styles.scrollView}>
      <Text style={styles.timer}>Time: {timer} sec</Text>
      <Text style={styles.timer}>Questions answered correctly: {score}</Text>
        {sampleQuestions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Question 
              data={question} 
              onSubmitAnswer={(answer) => handleAnswer(index, answer)} 
              isCorrect={answeredQuestions[index] ? answeredQuestions[index].correct : undefined} // Safely check for existence
              isGameOver={gameOver}
              attemptNumber={answeredQuestions[index]?.attemptNumber}
            />
            {answeredQuestions[index] && answeredQuestions[index].correct !== null && (
              <Text style={{ color: answeredQuestions[index].correct ? 'green' : 'red' }}>
                {answeredQuestions[index].correct ? 'Correct!' : `Try again!`}
              </Text>
            )}
             {gameOver && (answeredQuestions[index]?.correct === false || answeredQuestions[index] === undefined) && (
                  <Text style={{ color: 'blue' }}>Correct Answer: {question.answer}</Text>
              )}
          </View>
        ))}
      </ScrollView>
      <Button title="Give Up" onPress={handleGiveUp} />
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
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    marginTop: 50
  },
  questionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
