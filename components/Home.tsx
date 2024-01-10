import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View>
      <Text style={styles.text}>Hello Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
});
