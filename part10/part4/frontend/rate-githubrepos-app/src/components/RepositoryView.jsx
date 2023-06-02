import React from 'react';
import { FlatList, Text, View, Button, Linking } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { format } from 'date-fns';
import { reviewStyles } from '../theme';
import RepositoryItem from './RepositoryItem';


const RepositoryView = () => {
  const { id } = useParams();
  const repositoryId = id;
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  });

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const handleOpenInGitHub = () => {
    const url = data?.repository?.url;
    if (url) {
      Linking.openURL(url);
    }
  };

  const ReviewItem = ({ review }) => {
    const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

    return (
      <View key={review.id} style={reviewStyles.reviewContainer}>
        <View style={reviewStyles.ratingContainer}>
          <Text style={reviewStyles.ratingText}>{review.rating}</Text>
        </View>
        <View style={reviewStyles.reviewInfo}>
          <Text style={reviewStyles.username}>{review.user.username}</Text>
          <Text style={reviewStyles.date}>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <RepositoryItem repository={data.repository} />
      <Button title="Open in GitHub" onPress={handleOpenInGitHub} />
      
      <FlatList
        ListHeaderComponent={() => null}
        ListFooterComponent={() => null}
        data={data?.repository?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ node }) => node.id}
        ItemSeparatorComponent={() => <View style={reviewStyles.separator} />}
      />
    </View>
  );
};

export default RepositoryView;
