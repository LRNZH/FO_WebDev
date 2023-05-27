// AppBar.jsx
import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { appBarStyles } from '../theme';
import { Link } from 'react-router-native';

const AppBarTab = ({ to, text }) => {
  return (
    <Link to={to} underlayColor="#f0f4f7">
      <View style={appBarStyles.tab}>
        <Text style={appBarStyles.tabText}>{text}</Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={[appBarStyles.container, appBarStyles.appBar]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <AppBarTab to="/" text="Repositories" />
        <AppBarTab to="/signin" text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
