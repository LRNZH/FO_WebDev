import React from "react";
import { View, Text, Image } from "react-native";
import { repositoryItemStyles } from '../theme';

const formatCount = (count) => {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1);
    return `${formattedCount}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={repositoryItemStyles.container} >
      <View style={repositoryItemStyles.headerContainer} >
        <Image
          style={repositoryItemStyles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={repositoryItemStyles.infoContainer}>
          <Text style={repositoryItemStyles.title}>{repository.fullName}</Text>
          <Text style={repositoryItemStyles.description}>{repository.description}</Text>
          <View style={repositoryItemStyles.languageContainer}>
            <Text style={repositoryItemStyles.languageText}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={repositoryItemStyles.countsContainer}>
        <View style={repositoryItemStyles.countItem}>
          <Text style={repositoryItemStyles.countText}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text style={repositoryItemStyles.countLabel}>Stars</Text>
        </View>
        <View style={repositoryItemStyles.countItem}>
          <Text style={repositoryItemStyles.countText}>
            {formatCount(repository.forksCount)}
          </Text>
          <Text style={repositoryItemStyles.countLabel}>Forks</Text>
        </View>
        <View style={repositoryItemStyles.countItem}>
          <Text style={repositoryItemStyles.countText}>
            {formatCount(repository.reviewCount)}
          </Text>
          <Text style={repositoryItemStyles.countLabel}>Reviews</Text>
        </View>
        <View style={repositoryItemStyles.countItem}>
          <Text style={repositoryItemStyles.countText}>
            {formatCount(repository.ratingAverage)}
          </Text>
          <Text style={repositoryItemStyles.countLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RepositoryItem);