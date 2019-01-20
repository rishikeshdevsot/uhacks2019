# NoteThisBoard
![alt text](https://github.com/gmin7/uhacks2019/blob/master/photos/thumbnail.JPG)
Living in the big city, we're often conflicted between the desire to get more involved in our communities, with the effort to minimize the bombardment of information we encounter on a daily basis. NoteThisBoard is a mobile reactNative based application that aims to bring the user closer to a happy medium by allowing them to maximize their insights in a glance. This application enables the user to take a photo of a noticeboard filled with posters, and, after specifying their preferences, select the events that are predicted to be of highest relevance to them.

## Selecting preferences
![alt text](https://github.com/gmin7/uhacks2019/blob/master/photos/prefs.PNG)
The home page of the app directs to a list of filters/preferences that the user can apply. The user should tap on all of his preferences and then click done. These preferences are added to the `google firebase` database.

## Taking/Selecting a picture
![alt text](https://github.com/gmin7/uhacks2019/blob/master/photos/cam-gal.PNG)
After selecting the preferences the user is asked to either select an image from his gallery or take a picture of a notice board using the phone's camera. If a picture is taken, the picture is saved on the app's cache for furhter analysis.


## Analysing the data
After selecting a picture to use, the app uses `Google's Cloud Vision API` to perform Text recognition on the picture. The text obtained is divided into blocks as defined by the JSON package received by the REST API. Then the app performs `Google's Natural Language Processing API` to classify these blocks of texts into categories.

## Outputting the information
![alt text](https://github.com/gmin7/uhacks2019/blob/master/photos/output.PNG)
The app goes through the category assigned to each block and checks if it is preferred by the user. If it is then the block of text and the category assigned to it is outputted on the screen.

