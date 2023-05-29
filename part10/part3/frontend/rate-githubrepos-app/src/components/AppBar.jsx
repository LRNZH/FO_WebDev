import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { appBarStyles } from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

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
  const { data } = useQuery(ME);

  return (
    <View style={[appBarStyles.container, appBarStyles.appBar]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={appBarStyles.tabsContainer}>
          <AppBarTab to="/" text="Repositories" />
        </View>
        <View style={appBarStyles.tabsContainer}>
          {data && data.me ? (
            <AppBarTab to="/signout" text="Sign Out" />
          ) : (
            <AppBarTab to="/signin" text="Sign In" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};


export default AppBar;
