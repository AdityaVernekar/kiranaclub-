import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, memo} from 'react';
import AppLoader from '../../components/AppLoader';
import SearchInputContainer from '../../components/SearchContainer';
import {useNavigation} from '@react-navigation/native';
import {THEME_MODE, useTheme} from '../../context/ThemeContext';
import {ScrollView} from 'react-native-virtualized-view';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getTrendingGifs} from '../../services';
import useInfiniteFetch from '../../hooks/useInfiniteFetch';
import AppError from '../../components/AppError';
import {COLORS} from '../../config/utils';
import LottieView from 'lottie-react-native';

const {width: wWidth} = Dimensions.get('window');
const IMAGE_WIDTH = wWidth * 0.5 - 40;

const RenderItemView = memo(({item}) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Detail', {
      data: item,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={{margin: 10, position: 'relative'}}>
        {item?.user?.avatar_url && (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={{uri: item?.user?.avatar_url || item?.user?.banner_image}}
              style={{width: 30, height: 30, borderRadius: 25}}
            />
            <Text style={{color: 'white'}}>
              {String(item?.user?.username).slice(0, 10) + '...'}
            </Text>
          </View>
        )}
        <Image
          style={{width: IMAGE_WIDTH, height: IMAGE_WIDTH, borderRadius: 10}}
          source={{
            uri: item?.images?.original?.url || 'https://picsum.photos/400',
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

const renderItem = ({item, index}) => {
  return <RenderItemView item={item} key={item?.id} />;
};

const HomeScreen = ({route, navigation}) => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Custom Hook for infinite scrolling
  const {
    data,
    isLoading,
    isError,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isFetched,
    refetch,
  } = useInfiniteFetch(getTrendingGifs, searchTerm === '');

  useEffect(() => {
    if (isFetched && data && searchTerm === '') {
      let flattenData = data.pages.flatMap(page => page.data);
      setResults(flattenData);
    }
  }, [data, isFetched, searchTerm]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (isError) {
    return <AppError />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View
      style={[
        styles.container,
        theme === THEME_MODE.DARK
          ? {backgroundColor: COLORS.darkMode}
          : {backgroundColor: COLORS.lightMode},
      ]}>
      <LottieView
        source={require('../../assets/lottie/bg.json')}
        style={{
          width: '100%',
          height: 900,
          position: 'absolute',
          zIndex: -1,
        }}
        resizeMode="cover"
        autoPlay={true}
      />
      <View style={{marginBottom: 10}}>
        <SearchInputContainer
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setResults={setResults}
          setLoading={setLoading}
          loading={loading}
        />
      </View>
      {isLoading && <AppLoader />}
      <View style={{flex: 1, height: '90%'}}>
        <FlatList
          stickyHeaderHiddenOnScroll={true}
          data={results}
          style={{flex: 1, height: '90%'}}
          renderItem={renderItem}
          keyExtractor={(item, idx) => idx.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={results}
          ListFooterComponent={
            <View>
              {isFetchingNextPage && (
                <ActivityIndicator size={'small'} color={'red'} />
              )}
            </View>
          }
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    width: '50%',
  },
  columnWrapper: {
    marginBottom: 8,
  },
});
export default HomeScreen;
