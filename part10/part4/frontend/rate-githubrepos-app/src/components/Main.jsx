import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-native";
import { View } from "react-native";
import { mainStyles } from '../theme';

import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import AppBar from "./AppBar";
import SignIn from './SignIn';
import SignOut from "./SignOut";
import CreateReview from "./CreateReview";
import SignUpForm from './SignUpForm';
import MyReviews from './MyReviews';

const Main = () => {
  const authenticated = true;
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });

  const handleOrdering = (orderBy, orderDirection) => {
    setOrdering(orderBy, orderDirection);
  };

  return (
    <View style={mainStyles.container}>
      <AppBar setOrdering={handleOrdering}/>
      <Routes>
        <Route path="/" element={<RepositoryList ordering={ordering} />} />
        <Route path="/repositories/:id/*" element={<RepositoryView />} />
        {authenticated ? (
          <Route path="/createreview" element={<CreateReview />} />
        ) : (
          navigate("/signin", { replace: true })
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;