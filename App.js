import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Gugudan from './components/Gugudan';
import WordRelay from './components/WordRelay';
import NumberBaseball from './components/NumberBaseball';
import ResponseCheck from './components/ResponseCheck';
import Rsp from './components/Rsp';
import Lotto from './components/Lotto';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MineSearch from './components/MineSearch/MineSearch';
// import Test from './components/Test';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gugudan" component={Gugudan} />
        <Stack.Screen name="WordRelay" component={WordRelay} />
        <Stack.Screen name="Lotto" component={Lotto} />
        <Stack.Screen name="NumberBaseball" component={NumberBaseball} />
        <Stack.Screen name="ResponseCheck" component={ResponseCheck} />
        <Stack.Screen name="Rsp" component={Rsp} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} />
        <Stack.Screen name="MineSearch" component={MineSearch} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
