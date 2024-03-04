import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

const useInfiniteFetch = (queryFunction, shouldFetch = false) => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetched,
    isRefetching,
    isFetchingNextPage,
    isPending,
    isFetching,
    failureCount,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['trendingGifs'],
    queryFn: ({pageParam}) => queryFunction({limit: 10, offset: pageParam}),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage?.data?.length < 10) return undefined;
      return lastPage.nextPage;
    },
    enabled: shouldFetch, // Control whether the query is enabled
  });

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  console.log(shouldFetch, 'shoulDFetch', isFetchingNextPage, isFetching);

  // useEffect(() => {
  //   // Reset the flag to true after the first successful fetch
  //   if (isFetched) {
  //     refetch(); // This will reset the flag and fetch the next set of data
  //   }
  // }, [isFetched, refetch]);

  return {
    data,
    isLoading,
    isError,
    error,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isFetched,
    refetch,
  };
};

export default useInfiniteFetch;
