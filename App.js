import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');


  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const lastNumber = parseFloat(splitNumbers[2]);

    // Tratamento de casos para cálculo de porcentagem
    if (currentNumber.includes('%')) {
      if (operator === '+') {
        return setCurrentNumber((firstNumber + (lastNumber / 100)).toString());
      } else if (operator === '-') {
        setCurrentNumber((firstNumber - (lastNumber / 100)).toString());
      } else if (operator === 'x') {
        setCurrentNumber((firstNumber * (lastNumber / 100)).toString());
      } else if (operator === '/') {
        setCurrentNumber((firstNumber / (lastNumber / 100)).toString());
      } else {
        setCurrentNumber('Operação inválida!');
      }
      setCurrentNumber((firstNumber / 100).toString());
      return;
    }

    //Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString());
        return;
      case 'x':
        setCurrentNumber((firstNumber * lastNumber).toString());
        return;
      case '/':
        if (lastNumber === 0) {
          setCurrentNumber('Erro: Divisão por zero');
        } else {
          setCurrentNumber((firstNumber / lastNumber).toString());
        }
    }
    return;
  }


  function handleInput(buttonPressed) {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === 'x' || buttonPressed === '/' || buttonPressed === '%') {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ? (     //Mapeamento do botão
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: '#1E1240' }]}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : (
            // Mapeamento dos outros botões
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={styles.button}>
              <Text style={[styles.textButton, { color: typeof button === 'number' ? '#FFFFFF' : '#644A7A' }]}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}


// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1E1240',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#4E485E',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: "#420B75",
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 92,
    flex: 2,
  },
  textButton: {
    color: '#644A7A',
    fontSize: 20,
  }
});