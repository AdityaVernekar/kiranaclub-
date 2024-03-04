import ThemeSwitcher from '../components/ThemeSwitcher';
// import HomeScreenContainer from "../containers/homeScreenContainer";
// import GifDetailScreenContainer from "../containers/gifDetailScreenContainer";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppColors, THEME_MODE, useTheme} from '../context/ThemeContext';
import HomeScreen from '../screens/home/HomeScreen';
import GifDetailScreen from '../screens/home/GifDetails';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => {
            return <ThemeSwitcher />;
          },
          headerTintColor:
            theme !== THEME_MODE.DARK
              ? AppColors.dark.primary
              : AppColors.light.primary,
          headerStyle: {
            backgroundColor:
              theme === THEME_MODE.DARK
                ? AppColors.dark.primary
                : AppColors.light.primary,
          },
        }}>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Detail'} component={GifDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
