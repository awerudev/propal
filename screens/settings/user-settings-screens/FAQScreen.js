import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const questions = [
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to Settings -> Account -> Reset Password',
  },
  {
    question: 'How do I change my workout plan?',
    answer: 'To change your workout plan, go to Workout -> Choose Plan',
  },
  {
    question: 'Can I share my progress with friends?',
    answer: 'Yes, you can share your progress. Go to Progress -> Share',
  },
  // Add more questions here
];

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      {questions.map((item, index) => (
        <View key={index} style={styles.faq}>
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faq: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
  },
});
