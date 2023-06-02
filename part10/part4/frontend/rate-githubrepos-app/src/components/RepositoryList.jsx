import React, { useEffect, useState } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from '../hooks/useRepositories';
import { repoListStyles } from '../theme';
import RepositoryListHeader from './RepositoryListHeader';


export const RepositoryListContainer = ({ repositories, filterKeyword, setFilterKeyword, onEndReach }) => {
  const repositoryNodes = repositories.map(({ node }) => node);

  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <View style={repoListStyles.separator} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem testID="repositoryItem" repository={item} />
        </Pressable>
      )}
      keyExtractor={(item, index) => item.id + index} // Include index in keyExtractor
      ListHeaderComponent={<RepositoryListHeader filterKeyword={filterKeyword} setFilterKeyword={setFilterKeyword} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />

  );
};

const RepositoryList = ({ ordering }) => {
  const { orderBy, orderDirection } = ordering;
  const [filterKeyword, setFilterKeyword] = useState('');
  const [first, setFirst] = useState(5); // Set an initial value for the first argument
  const [after, setAfter] = useState('');
  const [lastEndCursor, setLastEndCursor] = useState('');

  const { data, loading, handleFetchMore } = useRepositories(orderBy, orderDirection, first, after);

  useEffect(() => {
    setAfter('');
    setFirst(10);
  }, [orderBy, orderDirection]);

  useEffect(() => {
    if (data && data.repositories.pageInfo.hasNextPage) {
      setAfter(lastEndCursor);
    }
  }, [data, lastEndCursor]);

  const handleEndReach = async () => {
    if (!loading) {
      const newEndCursor = await handleFetchMore();
      setLastEndCursor(newEndCursor);
    }
  };

  if (loading && !data) {
    return null;
  }

  const repositories = data.repositories.edges;
  let sortedRepositories = repositories.slice();

  if (orderBy === 'RATING_AVERAGE') {
    sortedRepositories.sort((a, b) => {
      const ratingA = a.node.ratingAverage;
      const ratingB = b.node.ratingAverage;

      if (orderDirection === 'ASC') {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });
  }

  const filteredRepositories = sortedRepositories.filter(({ node }) => {
    const fullName = node.fullName ? node.fullName.toLowerCase() : '';
    const ownerUsername = node.ownerUsername ? node.ownerUsername.toLowerCase() : '';
    const language = node.language ? node.language.toLowerCase() : '';
    const keyword = filterKeyword.toLowerCase();

    return fullName.includes(keyword) || ownerUsername.includes(keyword) || language.includes(keyword);
  });

  return (
    <RepositoryListContainer
      repositories={filteredRepositories}
      filterKeyword={filterKeyword}
      setFilterKeyword={setFilterKeyword}
      onEndReach={handleEndReach}
    />
  );
};

export default RepositoryList;