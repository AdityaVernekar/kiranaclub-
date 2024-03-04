import {Image, TouchableOpacity, View} from 'react-native';
import {THEME_MODE, useTheme} from '../context/ThemeContext';

import {ICONS} from '../config/utils';

const ThemeSwitcher = () => {
  const {theme, toggleTheme} = useTheme();
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <TouchableOpacity onPress={handleThemeChange}>
      <View>
        {theme === THEME_MODE.DARK ? (
          <Image
            source={ICONS.lightMode}
            style={{width: 24, height: 24}}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={ICONS.darkMode}
            style={{width: 24, height: 24}}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;
