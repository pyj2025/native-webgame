import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from './Home';

const MineSearch = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 30 }}>MineSearch</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MineSearch;
