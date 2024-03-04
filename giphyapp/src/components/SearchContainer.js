import React, {useEffect, useCallback, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getSearchGifs} from '../services';
import {ICONS} from '../config/utils';
import useDebounce from '../hooks/useDebounce';

const SearchInputContainer = ({
  setLoading,
  setResults,
  loading,
  searchTerm,
  setSearchTerm,
}) => {
  // debounce search term
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['searchGifs'],
    enabled: false,
    queryFn: () =>
      getSearchGifs({query: debouncedSearch, limit: 25, offset: 0}),
  });

  const handleSearchGifs = useCallback(async () => {
    if (loading) {
      return;
    }
    // console.log('handleSearchGifs');
    setLoading(true);
    await refetch();
    setLoading(false);
  }, [debouncedSearch, loading]);

  useEffect(() => {
    if (debouncedSearch !== '' && debouncedSearch.length > 2) {
      handleSearchGifs();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (data) {
      setResults(data?.data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        inputMode="text"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <TouchableOpacity onPress={handleSearchGifs}>
        <Image
          source={ICONS.search}
          style={{width: 24, height: 24}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInputContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
});
