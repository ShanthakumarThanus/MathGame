import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

const MAX_TIME = 30;

const getMaxNumber = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 50; // Nombres entre 1 et 50
    case "hard":
      return 500; // Nombres entre 1 et 500
    default:
      return 50; // Valeur par défaut (easy)
  }
};

const rndNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const formatTime = (time) => {
  return time < 10 ? `00 : 0${time}` : `00 : ${time}`;
};

export default function MathGame({ difficulty, onBack }) {
  const [maxNumber, setMaxNumber] = useState(getMaxNumber(difficulty));
  const [numberOne, setNumberOne] = useState(rndNumber(maxNumber));
  const [numberTwo, setNumberTwo] = useState(rndNumber(maxNumber));
  const [numberThree, setNumberThree] = useState(difficulty === "hard" ? rndNumber(maxNumber) : 0);
  const [solution, setSolution] = useState(
    difficulty === "hard" ? numberOne + numberTwo + numberThree : numberOne + numberTwo
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [btnEnabled, setBtnEnabled] = useState(true);

  useEffect(() => {
    setSolution(difficulty === "hard" ? numberOne + numberTwo + numberThree : numberOne + numberTwo);
  }, [numberOne, numberTwo, numberThree, difficulty]);

  useEffect(() => {
    const timer = setInterval(decreaseTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setBtnEnabled(false);
      setMsg(`Temps écoulé, la bonne réponse était ${solution}`);
    }
  }, [timeLeft]);

  const decreaseTime = () => {
    setTimeLeft((prev) => Math.max(prev - 1, 0));
  };

  const startGame = () => {
    setMaxNumber(getMaxNumber(difficulty));
    setNumberOne(rndNumber(getMaxNumber(difficulty)));
    setNumberTwo(rndNumber(getMaxNumber(difficulty)));
    setNumberThree(difficulty === "hard" ? rndNumber(getMaxNumber(difficulty)) : 0);
    setSolution(difficulty === "hard" ? numberOne + numberTwo + numberThree : numberOne + numberTwo);
    setUserAnswer("");
    setMsg("");
    setBtnEnabled(true);
    setTimeLeft(MAX_TIME);
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === solution) {
      setMsg("Bonne réponse !");
    } else {
      setMsg(`Mauvaise réponse, la réponse était ${solution}`);
    }
    setNumberOne(rndNumber(maxNumber));
    setNumberTwo(rndNumber(maxNumber));
    setNumberThree(difficulty === "hard" ? rndNumber(maxNumber) : 0);
    setSolution(difficulty === "hard" ? numberOne + numberTwo + numberThree : numberOne + numberTwo);
    setUserAnswer("");
  };

  return (
    <View style={styles.container}>
      <Button title="Nouvelle partie" onPress={startGame} disabled={!btnEnabled} />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
        Temps restant: {formatTime(timeLeft)}
      </Text>

      {/*Affichage dynamique des nombres en fonction du mode */}
      <Text style={{ fontSize: 24 }}>
        {numberOne} + {numberTwo}
        {difficulty === "hard" && ` + ${numberThree}`} = ?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Réponse"
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />

      <Text style={{marginVertical: 10}}>
        <Button title="Valider" onPress={handleSubmit} disabled={!btnEnabled} />
      </Text>
      {msg !== "" && (
        <Text style={{ fontSize: 18, marginVertical: 10 }}>{msg}</Text>
      )}
      <Text style={{marginVertical: 10}}>
        <Button title="Retour" onPress={onBack} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: 100,
    textAlign: "center",
  },
});
