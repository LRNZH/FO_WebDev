import React from "react";
import { Route, Routes, Navigate } from "react-router-native";
import { View } from "react-native";
import { mainStyles } from '../theme';

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from './SignIn';
import SignOut from "./SignOut";


const Main = () => {
  return (
    <View style={mainStyles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;