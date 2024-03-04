import {ActivityIndicator, StyleSheet, View} from 'react-native';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={30} color={'red'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppLoader;
