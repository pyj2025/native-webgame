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
import Icon from 'react-native-vector-icons/FontAwesome';

export type RootStackParam = {
  Home: undefined;
  Gugudan: undefined;
  WordRelay: undefined;
  NumberBaseball: undefined;
  ResponseCheck: undefined;
  Rsp: undefined;
  Lotto: undefined;
  TicTacToe: undefined;
  MineSearch: undefined;
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const screenWidth = Dimensions.get('window').width;

  const buttons = [
    'MineSearch',
    'TicTacToe',
    'Lotto',
    'Rsp',
    'ResponseCheck',
    'NumberBaseball',
    'WordRelay',
    'Gugudan',
  ];

  const renderButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={{ ...styles.button, width: screenWidth - 30 }}
      onPress={() => navigation.push(item as any)}
    >
      <Text style={styles.buttonText}>{item}</Text>
      <Icon name="chevron-right" size={20} style={styles.buttonIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
  buttonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    flex: 8,
    textAlign: 'center',
    color: 'black',
  },
  buttonIcon: {
    flex: 2,
    textAlign: 'center',
    color: 'gray',
  },
});

export default Home;
