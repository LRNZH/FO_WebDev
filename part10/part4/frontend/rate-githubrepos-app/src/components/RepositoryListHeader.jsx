import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
  },
});

const RepositoryListHeader = ({ filterKeyword, setFilterKeyword }) => {
  const onChangeSearch = query => {
    setFilterKeyword(query);
  };

  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={filterKeyword}
    />
  );
};

export default RepositoryListHeader;
