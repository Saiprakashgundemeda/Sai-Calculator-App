import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function EnhancedCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const calculatedResult = eval(input).toString();
        setResult(calculatedResult);
        setInput(''); // Clear input after calculation
      } catch (error) {
        setResult('Error');
        setInput('');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
          placeholder="Enter calculation"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        {[
          ['C', '⌫', '/', '*'],
          ['7', '8', '9', '-'],
          ['4', '5', '6', '+'],
          ['1', '2', '3', '='],
          ['0', '.'],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((val) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  val === '=' && styles.equalsButton,
                  ['+', '-', '*', '/'].includes(val) && styles.operationButton,
                ]}
                key={val}
                onPress={() => handlePress(val)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    val === '=' && styles.equalsText,
                  ]}
                >
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Calc by Sai Prakash</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
    justifyContent: 'space-between',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#ffeb3b', // Yellow for display
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    fontSize: 36,
    color: '#333',
    textAlign: 'right',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  result: {
    fontSize: 24,
    color: '#888',
    textAlign: 'right',
    marginTop: 10,
  },
  buttons: {
    flex: 3,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ddd', // Default button background
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30, // Circular buttons
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  operationButton: {
    backgroundColor: '#ffeb3b', // Yellow for arithmetic operations
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  equalsButton: {
    backgroundColor: '#4caf50', // Green for "=" button
  },
  equalsText: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#5b3c88', // Violet footer
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
});
