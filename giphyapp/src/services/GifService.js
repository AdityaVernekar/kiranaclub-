import {Alert, PermissionsAndroid, Share, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

class GifServices {
  static getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  static ShareGif = async shareOptions => {
    try {
      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing GIF:', error.message);
    }
  };

  static checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download photos',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  static downloadGif = async image_URL => {
    try {
      let date = new Date();
      let ext = this.getExtension(image_URL);
      ext = '.' + ext[0];

      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };

      const res = await config(options).fetch('GET', image_URL);
      ToastAndroid.show('Downloading...', ToastAndroid.SHORT);

      if (res.status === 200) {
        // Alert.alert('Image Downloaded Successfully.');
        ToastAndroid.show('Image Downloaded Successfully', ToastAndroid.SHORT);
      } else {
        Alert.alert('Download Failed', 'Unable to download the image.');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'An error occurred while downloading the image.');
    }
  };
}

export default GifServices;
