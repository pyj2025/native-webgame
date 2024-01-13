import React from 'react';
import { View, Text, Button, Image, Dimensions } from 'react-native';

type RSPCoords = {
  [key: string]: string;
};

type Scores = {
  [key: string]: number;
};

const rspCoords: RSPCoords = {
  Rock: '0',
  Scissor: '-142px',
  Paper: '-284px',
};

const scores: Scores = {
  Scissor: 1,
  Rock: 0,
  Paper: -1,
};

const computerChoice = (imgCoord: string) =>
  Object.entries(rspCoords).find((v) => v[1] === imgCoord)![0];

const RSP: React.FC = () => {
  const [result, setResult] = React.useState<string>('');
  const [imgCoord, setImgCoord] = React.useState<string>(rspCoords.Rock);
  const [score, setScore] = React.useState<number>(0);

  const interval = React.useRef<any>(null);

  const screenWidth = Dimensions.get('window').width;

  React.useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current!);
    };
  }, [imgCoord]);

  const changeHand = React.useCallback(() => {
    if (imgCoord === rspCoords.Rock) {
      setImgCoord(rspCoords.Scissor);
    } else if (imgCoord === rspCoords.Scissor) {
      setImgCoord(rspCoords.Paper);
    } else if (imgCoord === rspCoords.Paper) {
      setImgCoord(rspCoords.Rock);
    }
  }, [setImgCoord]);

  const onClickBtn = React.useCallback(
    (choice: string) => () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
          setResult('Draw!');
        } else if ([-1, 2].includes(diff)) {
          setResult('You Win!');
          setScore((prevScore) => prevScore + 1);
        } else {
          setResult('You Lose!');
          setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
          interval.current = setInterval(changeHand, 100);
        }, 1000);
      }
    },
    [setResult, setScore]
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text>Score: {score}</Text>
      <Image
        source={{ uri: 'https://en.pimg.jp/023/182/267/1/23182267.jpg' }}
        style={{
          width: screenWidth - 20,
          height: 180,
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
          alignContent: 'space-between',
          width: screenWidth - 100,
        }}
      >
        <Button title="Rock" onPress={onClickBtn('Rock')} />
        <Button title="Scissor" onPress={onClickBtn('Scissor')} />
        <Button title="Paper" onPress={onClickBtn('Paper')} />
      </View>
      <Text>{result}</Text>
    </View>
  );
};

export default RSP;
