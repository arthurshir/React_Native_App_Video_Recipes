# Video Recipes - an iOS App written in React Native
Video Recipes is an app I made in response to an extremely popular video trend of 1 minute videos that teach the viewer how to cook a dish (Take [Buzzfeed](http://www.facebook.com/buzzfeedtasty/videos/1887826731469967/) for example). This app allows the user to categorize, search, and favorite various video recipes. I created this to test the market and also gain experience with React.js. There is also a corresponding Videos Service API I built with the Django REST Framework and ran on AWS that this app pulls from periodically.

## Building
Run 'npm install' at root, and then start app by 'react-native run-ios'

## Caveats
This app does not follow all of React's best practice paradigms. Also, there was a slight issue where favorites would not update as quickly. There is also a startup issue where occasionally startup is a bit slow
 
## Stuff I'm proud of
* I used a neat react native component for making the conversion of links in video descriptions to hyperlinks very straightforward
* Deploying my first React Naive app live to the app store https://itunes.apple.com/us/app/30s-video-recipes/id1161291434?mt=8
* The Realm database worked smoothly and the model.

## Libraries
* react-native-hyperlink https://www.npmjs.com/package/react-native-hyperlink
* react-native-mail https://github.com/chirag04/react-native-mail
* react-native-parsed-text https://github.com/taskrabbit/react-native-parsed-text
* react-native-search-bar https://github.com/umhan35/react-native-search-bar
* react-native-video https://github.com/react-native-community/react-native-video

## Things I'd do differently next time
* Rewrite most of the child props and callbacks. I would also rebuild the entire app structure. I wrote this app when I was still understanding React philosophies and paradigms
