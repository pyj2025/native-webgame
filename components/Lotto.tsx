import React from 'react';
import { View, Text, Button } from 'react-native';

const getWinNumbers = () => {
  const candidate = Array(45)
    .fill(0)
    .map((_, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
};

const Ball = React.memo(({ num }: { num: number }) => {
  let background;

  if (num <= 10) {
    background = 'red';
  } else if (num <= 20) {
    background = 'orange';
  } else if (num <= 30) {
    background = 'yellow';
  } else if (num <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <View
      style={{
        backgroundColor: background,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
      }}
    >
      <Text style={{ color: 'white', fontSize: 20 }}>{num}</Text>
    </View>
  );
});

const Lotto: React.FC = () => {
  const lottoNumbers = React.useMemo(() => getWinNumbers(), []);

  const [winNumbers, setWinNumbers] = React.useState<number[]>(lottoNumbers);
  const [winBalls, setWinBalls] = React.useState<number[]>([]);
  const [bonus, setBonus] = React.useState<number | null>(null);
  const [redo, setRedo] = React.useState<boolean>(false);
  const timeouts = React.useRef<Array<any>>([]);

  React.useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]!);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [winNumbers]);

  const reset = React.useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <View>
      <View>
        <Text>Winning Numbers</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {winBalls.map((v) => (
          <Ball key={v} num={v} />
        ))}
      </View>
      <View>
        <Text>Bonus!</Text>
      </View>
      {bonus && <Ball num={bonus} />}
      {redo && <Button title="One More Time!" onPress={reset} />}
    </View>
  );
};

export default Lotto;
