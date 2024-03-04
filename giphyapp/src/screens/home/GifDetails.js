import React, {useRef, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import {THEME_MODE, useTheme} from '../../context/ThemeContext';
import GifServices from '../../services/GifService';
import {COLORS} from '../../config/utils';

const {height: wHeight} = Dimensions.get('window');

const GifDetailScreen = React.memo(({navigation, route}) => {
  const {theme} = useTheme();
  const video = useRef(null);
  const [paused, setPaused] = useState(false);

  const {data} = route.params;

  console.log(data);

  const image_URL = data?.images?.original?.url;

  const handleShare = async () => {
    const shareOptions = {
      message: 'Check out this GIF!' + '-->' + data?.bitly_url,
    };

    await GifServices.ShareGif(shareOptions);
  };

  const handleDownload = () => {
    let isAccessAllowed = GifServices.checkPermission();

    if (isAccessAllowed) {
      GifServices.downloadGif(image_URL);
    } else {
      Alert.alert('Storage Permission Required');
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        theme === THEME_MODE.DARK
          ? {backgroundColor: COLORS.darkMode}
          : {backgroundColor: COLORS.lightMode},
      ]}>
      {data?.user?.banner_url && (
        <View style={{position: 'relative', marginBottom: 50}}>
          <Image
            source={{
              uri:
                data?.user?.banner_url ||
                'https://media3.giphy.com/avatars/snl/eX6bfO3GejHA.jpg',
            }}
            style={{
              width: '100%',
              height: 100,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <Image
            source={{
              uri:
                data?.user?.avatar_url ||
                'https://media3.giphy.com/avatars/snl/eX6bfO3GejHA.jpg',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              position: 'absolute',
              bottom: -40,
              left: 20,
            }}
            resizeMode="cover"
          />
        </View>
      )}
      <Video
        ref={video}
        resizeMode={'contain'}
        style={styles.image}
        source={{
          uri: data?.images?.original?.mp4,
        }}
        poster={data?.images?.original?.url}
        muted
        paused={paused}
        repeat={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          color={theme === THEME_MODE.DARK ? 'orange' : 'black'}
          title={paused ? 'Play' : 'Pause'}
          onPress={() => {
            setPaused(!paused);
          }}
        />
      </View>
      {data?.user?.username && (
        <View style={{padding: 4, marginTop: 10}}>
          <Text
            style={{
              color: THEME_MODE.DARK ? 'orange' : 'red',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            @{data?.user?.username}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
            }}>
            {data?.user?.description}
          </Text>
        </View>
      )}

      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handleDownload} style={styles.button}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: wHeight * 0.4,
    borderRadius: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 50,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    marginHorizontal: 8,
    color: '#555',
  },
});

export default GifDetailScreen;
