import React from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { reviewStyles } from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const MyReviews = () => {
    const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews: true },
    });

    const [deleteReview] = useMutation(DELETE_REVIEW);
    const navigate = useNavigate();

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const user = data?.me;

    if (!user) {
        return <Text>No user found.</Text>;
    }

    const reviews = user.reviews.edges;

    const handleDeleteReview = (reviewId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteReview({ variables: { id: reviewId } });
                            refetch();
                        } catch (error) {
                            console.error('Error deleting review:', error);
                        }
                    },
                },
            ],
        );
    };

    const handleViewRepository = (repositoryId) => {
        navigate(`/repositories/${repositoryId}`);
    };

    const ReviewItem = ({ review }) => {
        const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

        return (
            <View style={reviewStyles.reviewContainer}>
                <View style={reviewStyles.ratingContainer}>
                    <Text style={reviewStyles.ratingText}>{review.rating}</Text>
                </View>
                <View style={reviewStyles.reviewInfo}>
                    <Text style={reviewStyles.username}>{review.repository.fullName}</Text>
                    <Text style={reviewStyles.date}>{formattedDate}</Text>
                    <Text>{review.text}</Text>
                    <View style={reviewStyles.buttonContainer}>
                        <View style={reviewStyles.spacer} />
                        <Button
                            onPress={() => handleViewRepository(review.repository.id)}
                            title="View Repository"
                            color="#6096B4"
                        />
                        <View style={reviewStyles.spacer} />
                        <Button
                            onPress={() => handleDeleteReview(review.id)}
                            title="Delete"
                            color="#E06469"
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View>
            <Text style={reviewStyles.username}>Welcome, {user.username}!</Text>
            <Text style={reviewStyles.title}>Here are your reviews:</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item.node} />}
                keyExtractor={({ node }) => node.id}
                ItemSeparatorComponent={() => <View style={reviewStyles.separator} />}
            />
        </View>
    );
};

export default MyReviews;
