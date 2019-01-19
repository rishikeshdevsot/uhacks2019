import React, { Component } from 'react';
import { Button, Text, ScrollView, StyleSheet } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';


export default class App extends Component {
  state = {
    result: null,
    abase64: null,
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    const { cancelled,uri,base64, } = await ImagePicker.launchImageLibraryAsync({ base64: true, allowsEditing: true, });
    //this.setState({ result });
    this.setState({abase64: base64});

    const body = 
    {
    requests:[ 
    { 
    image:{ content: this.state.abase64, }, 
    features:[{"type":"TEXT_DETECTION","maxResults":10},{"type":"DOCUMENT_TEXT_DETECTION","maxResults":10}],
    },],
    };
      const response = await fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCznKndZSAxTcAPBn8VuamKN2e9SLc5hQY", 
    {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(body),
    });

      const json = await response.json();
      //console.log(json);
      console.log(json.responses[0].fullTextAnnotation.text);
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[0].boundingBox.vertices[0].y);
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[0].text);
      //console.log("-----------------------------------------------------------------------------");
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[1]);

    // this.setState({result: response});
    // console.log(response.Response);
    /*const myArrStr = JSON.stringify(response);
    const myArrStr1 = JSON.parse(myArrStr);
    const myArrStr2 = JSON.stringify(myArrStr1._bodyInit);
    const myArrStr3 = JSON.parse(myArrStr2);
    console.log(myArrStr3{responses});
    */

  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    const { cancelled,uri,base64,} = await ImagePicker.launchCameraAsync({
  base64: true, allowsEditing: true, });
    this.setState({abase64: base64});
    //this.setState({ result });

  const body = 
  {
  requests:[ 
  { 
  image:{ content: this.state.abase64, }, 
  features:[{"type":"TEXT_DETECTION","maxResults":5},{"type":"DOCUMENT_TEXT_DETECTION","maxResults":5}],
  },],
  };
    const response = await fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCznKndZSAxTcAPBn8VuamKN2e9SLc5hQY", 
  {
  method: 'POST',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
  body: JSON.stringify(body),
  });

  this.setState({result: response});
  const myArrStr = JSON.stringify(response);

  console.log(JSON.parse(myArrStr));

  };



  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Button title="launchCameraAsync" onPress={this.useCameraHandler} />
        <Button
          title="launchImageLibraryAsync"
          onPress={this.useLibraryHandler}
        />
        <Text style={styles.paragraph}>
          {JSON.stringify(this.state.result)}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    minHeight: 1000,
  },
  paragraph: {
    marginHorizontal: 15,
    marginTop: 30,
    fontSize: 18,
    color: '#34495e',
  },
});
