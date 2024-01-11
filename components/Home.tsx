import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParam = {
  Home: undefined;
  Ggetmal: undefined;
  Gugudan: undefined;
  NumberBaseball: undefined;
  ResponseCheck: undefined;
  Rsp: undefined;
  Lotto: undefined;
  TicTacToe: undefined;
  MineSearch: undefined;
  Test: undefined;
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  var screenWidth = Dimensions.get('window').width;

  const buttons = [
    'Ggetmal',
    'Gugudan',
    'NumberBaseball',
    'ResponseCheck',
    'Rsp',
    'Lotto',
    'TicTacToe',
    'MineSearch',
    'Test',
  ];

  const renderButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={{ ...styles.button, width: screenWidth - 30 }}
      onPress={() => navigation.push(item as any)}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      <FlatList
        data={buttons}
        renderItem={renderButton}
        keyExtractor={(item) => item}
        numColumns={1}
        horizontal={false}
        contentContainerStyle={styles.buttonList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 30,
    marginBottom: 20,
  },
  buttonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#3498db',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});

export default Home;
