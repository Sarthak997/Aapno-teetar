import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ProfileBadgeComponent} from './profiles'
import {FeedComponent, TweetsComponent, TweetDetailComponent} from './tweets'
import * as serviceWorker from './serviceWorker';

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}

//ReactDOM.render(
//  //<React.StrictMode>
//    <App />,
//  //</React.StrictMode>,
//  document.getElementById('root')
//);
const e = React.createElement
const tweetsEl = document.getElementById("tweetme-2")
if (tweetsEl) {
    console.log(tweetsEl.dataset)
    const MyComponent = e(TweetsComponent, tweetsEl.dataset)
   // ReactDOM.render(<TweetsComponent />, tweetsEl);
   ReactDOM.render(MyComponent, tweetsEl);
}

//const f = React.createElement
const tweetFeedEl = document.getElementById("tweetme-2-feed")
if (tweetFeedEl) {
    console.log(tweetFeedEl.dataset)
   // const MyComponent = e(FeedComponent, tweetsFeedEl.dataset)
   // ReactDOM.render(<TweetsComponent />, tweetsEl);
   ReactDOM.render(
        e(FeedComponent, tweetFeedEl.dataset), tweetFeedEl);
}

const TweetDetailElements = document.querySelectorAll(".tweetme-2-detail")

TweetDetailElements.forEach(container => {
    ReactDOM.render(
    e(TweetDetailComponent, container.dataset),
    container);
})

const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge")

userProfileBadgeElements.forEach(container => {
    ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset),
    container);
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
