import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import TextInput from './TextInput';
import { reviewStyles } from '../theme';
import { useNavigate } from 'react-router-native';
import { GET_REPOSITORIES } from '../graphql/queries';

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const { refetch } = useQuery(GET_REPOSITORIES);
  // eslint-disable-next-line no-unused-vars
  const [ownerName, setOwnerName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [repositoryName, setRepositoryName] = useState('');

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    review: '',
  };

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required("Repository owner's username is required"),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating must be at most 100'),
    review: Yup.string().required('Review comment required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { ownerName, repositoryName, rating, review } = values;
    setOwnerName(ownerName);
    setRepositoryName(repositoryName);
    await createReview({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: Number(rating),
          text: review,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });

    resetForm();

    const { data } = await refetch();
    const repositories = data.repositories.edges;
    const newlyCreatedRepository = repositories.find(
      (repository) =>
        repository.node.fullName === `${ownerName.toLowerCase()}/${repositoryName.toLowerCase()}`
    );

    if (newlyCreatedRepository) {
      const repositoryId = newlyCreatedRepository.node.id;
      navigate(`/repositories/${repositoryId}`);
    } else {
      navigate('/');
    }
  };


  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <View>
            <TextInput
              name="ownerName"
              placeholder="Repository owner's username"
              style={reviewStyles.input}
              onChangeText={handleChange('ownerName')}
              onBlur={handleBlur('ownerName')}
              value={values.ownerName}
              error={touched.ownerName && errors.ownerName}
            />
            <TextInput
              name="repositoryName"
              placeholder="Repository name"
              style={reviewStyles.input}
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
              value={values.repositoryName}
              error={touched.repositoryName && errors.repositoryName}
            />
            <TextInput
              name="rating"
              placeholder="Rating (0-100)"
              style={reviewStyles.input}
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
              error={touched.rating && errors.rating}
            />

            <TextInput
              name="review"
              placeholder="Review"
              multiline
              style={[reviewStyles.input, reviewStyles.multilineInput]}
              onChangeText={handleChange('review')}
              onBlur={handleBlur('review')}
              value={values.review}
              error={touched.review && errors.review}
            />
            <Button title="Create Review" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;