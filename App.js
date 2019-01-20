import React from 'react';
import { Button, Text, ScrollView, StyleSheet, View, Switch, TouchableHighlight} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { ImagePicker, Permissions, Constants } from 'expo';

var firebase = require('firebase');

var config = {
  databaseURL: 'https://uofthacksvi-6ec96.firebaseio.com',
  projectID: 'uofthacksvi-6ec96'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    //this.prefArray =  [];
    color = "red";
    this.state = { styleIndex: 0, prefArray: [] }
  }

  arr(name) {
    this.state.prefArray.push(name);
    //console.log(this.state.prefArray);
  }

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

  submitTags(){

    this.writeTags(this.state.prefArray);
    this.props.navigation.navigate('Details');

  }

  render() {
    return (
      <ScrollView>
        <Text>Home Screen</Text>



        <Button
          title="Adult"
          onPress={() => this.arr('Adult')}
        />

        <Button 
          title="Arts & Entertainment"
          onPress={() => this.arr('Arts & Entertainment')}
        />
        <Button
          title="Autos & Vehicles"
          onPress={() => this.arr('Autos & Vehiclesi')}
        />
        <Button
          title="Beauty & Fitness"
          onPress={() => this.arr('Beauty & Fitness')}
        />
        <Button
          title="Books & Literature"
          onPress={() => this.arr('Books & Literature')}
        />
        <Button
          title="Business & Industrial"
          onPress={() => this.arr('Business & Industrial')}
        />
        <Button
          title="Computers & Electronics"
          onPress={() => this.arr('Computers & Electronics')}
        />
        <Button
          title="Finance"
          onPress={() => this.arr('Finance')}
        />
        <Button
          title="Food & Drink"
          onPress={() => this.arr('Food & Drink')}
        />
        <Button
          title="Games"
          onPress={() => this.arr('Games')}
        />
        <Button
          title="Health"
          onPress={() => this.arr('Health')}
        />
        <Button
          title="Hobbies & Leisure"
          onPress={() => this.arr('Hobbies & Leisure')}
        />
        <Button
          title="Home & Garden"
          onPress={() => this.arr('Home & Garden')}
        />
        <Button
          title="Internet & Telecom"
          onPress={() => this.arr('Internet & Telecom')}
        />
        <Button
          title="Jobs & Education"
          onPress={() => this.arr('Jobs & Education')}
        />
        <Button
          title="Law & Government"
          onPress={() => this.arr('Law & Government')}
        />
        <Button
          title="News"
          onPress={() => this.arr('News')}
        />
        <Button
          title="Online Communities"
          onPress={() => this.arr('Online Communities')}
        />
        <Button
          title="People & Society"
          onPress={() => this.arr('People & Society')}
        />
        <Button
          title="Pets & Animals"
          onPress={() => this.arr('Pets & Animals')}
        />
        <Button
          title="Real Estate"
          onPress={() => this.arr('Real Estate')}
        />
        <Button
          title="Reference"
          onPress={() => this.arr('Reference')}
        />
        <Button
          title="Science"
          onPress={() => this.arr('Science')}
        />
        <Button
          title="Shopping"
          onPress={() => this.arr('Shopping')}
        />
        <Button
          title="Sports"
          onPress={() => this.arr('Sports')}
        />
        <Button
          title="Travel"
          onPress={() => this.arr('Travel')}
        />
        <Button
          title="Done"
          onPress={() => 
            this.submitTags()
          }
        />

      </ScrollView>

    );

  }
}


class DetailsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { result: null,
    abase64: null, }
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };


  readTags() {
    firebase.database().ref('Tags/tags').once('value', function (snapshot) {
      console.log(snapshot.val())
    });
  }

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    const { cancelled,uri,base64, } = await ImagePicker.launchImageLibraryAsync({ base64: true, allowsEditing: true, });
    //this.setState({ result });
    this.setState({abase64: base64});
    //this.snapshot;


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

      var body2 = 
    {
          "document": {
            type: "PLAIN_TEXT",
            language:"EN",
            content:"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter O'Toole plays Lawrence in the film.",
          }
    };

      const json = await response.json();
      //console.log(json);
      console.log(json.responses[0].fullTextAnnotation.text);
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[0].boundingBox.vertices[0].y);
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[0].text);
      //console.log("-----------------------------------------------------------------------------");
      //console.log(json.responses[0].fullTextAnnotation.pages[0].blocks[1]);

    var s = '';
    var z = '';
    var i =0;
    var json2;

    //for (let i=0; i < json.responses[0].fullTextAnnotation.pages.length; i++){
      for(let j=0; j< json.responses[0].fullTextAnnotation.pages[i].blocks.length; j++){
        for(let k=0; k<json.responses[0].fullTextAnnotation.pages[i].blocks[j].paragraphs.length; k++){
          for(let l=0; l<json.responses[0].fullTextAnnotation.pages[i].blocks[j].paragraphs[k].words.length; l++){
            for(let m=0; m<json.responses[0].fullTextAnnotation.pages[i].blocks[j].paragraphs[k].words[l].symbols.length; m++){
                
              z = z + json.responses[0].fullTextAnnotation.pages[i].blocks[j].paragraphs[k].words[l].symbols[m].text;
              //console.log(json.responses[0].fullTextAnnotation.pages[i].blocks[j].paragraphs[k].words[l].symbols[m].text);

                
            }
            z = z + ' ';
          }
        }

      var h = z.split(" ");
        //console.log(h);
        if(h.length >= 20){
          body2.document.content = z;
          //console.log(body2);

          var response2 = await fetch("https://language.googleapis.com/v1/documents:classifyText?key=AIzaSyCbgPPNl5-CA9qw5ND0hcqDis1XEWeC61Y", 
          {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body2),
          });

          json2 = await response2.json();
          if(json2.categories!=undefined){
            console.log(z + ' -- ');
            console.log(json2.categories);
            console.log('\n');            
          }
          
          //console.log(z);
          //console.log(json2);
          //console.log(json2.categories[0].name);
          //s = s + z + ' - ' + json2.categories[0].name + '\n';
          z = z + ' - ' + json2 + '\n';
          s = s + z;
          //console.log(z);
          z = '';
        }
        else{
          console.log('--------');
        }
      }
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
          Hello
        </Text>
      </ScrollView>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


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



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


















