import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
//import { RNCamera, FaceDetector } from 'react-native-camera';

//database stuff 
//So basically we want to be able to ask the user for some preferences 
//and then add them to the database so that the algorithm can check 
//if any of the posters match any of those tags and save it
var config = {
  databaseURL: 'https://uofthacksvi-6ec96.firebaseio.com',
  projectID: 'uofthacksvi-6ec96'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ''
    };

    this.writeTags = this.writeTags.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
    this.setState = this.setState.bind(this)
  }

  setState(data){
    this.setState({
      tags: data
    })
  }

  //write tags to database 
  writeTags(tags) {
    firebase.database().ref('Tags/').set({
      tags
    }).then((data) => {
      //successful callback
      console.log('data: ', data)
    }).catch((err) => {
      //error callback
      console.log('err: ', err)
    });
  }

  deleteTag() {
    firebase.database().ref('Tags/').remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to our project :-)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
