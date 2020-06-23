import React, {useState, useEffect} from 'react'

import {apiTweetList} from './lookup'

import {Tweet} from './detail'

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [tweetsDidSet, setTweetsDidSet] = useState(false) // added because of infinite loop of lookup function
    //setTweetsInit([...props.newTweets].concat()) commented because infinite loop
      useEffect(() => {
      //,... Does the same thing as concat
        const final = [...props.newTweets, ...tweetsInit]//.concat(tweetsInit)
        if (final.length !== tweets.length) {
        setTweets(final)
        console.log("tweets", tweets)
        }
      }, [props.newTweets, tweets, tweetsInit]) // this is called as the dependency array as on what is the useEffect dependent on

      useEffect(() => {
      if (tweetsDidSet === false){
      //added this if loop to stop lookup loading again and again
        const handleTweetListLookup = (response, status) => {
        console.log("response", response)
        if (status === 200){
               setNextUrl(response.next)
               setTweetsInit(response.results)
               setTweetsDidSet(true)
                //console.log("tweetsINIt", tweetsInit)
            } else {
                alert("There was list error")
            }
  }
    // do my lookup
        apiTweetList(props.username, handleTweetListLookup)
      }
  },[tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])


  const handledidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)

  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null){
        const handleLoadNextResponse = (response, status)=>{
            if (status ===200){
                setNextUrl(response.next)
                const newTweets = [...tweets].concat(response.next)
                setTweetsInit(newTweets)
                setTweets(newTweets)
            }
            else {
            alert("There was an error")
            }
        }
        apiTweetList(props.username, handleLoadNextResponse, nextUrl)
      }
  }

  return  <React.Fragment>{tweets.map((item, index)=>{
                //console.log(tweetsInit)
                return <Tweet tweet={item}
                didRetweet = {handledidRetweet}
                className='my-5 py-5 border bg-white text-dark'
                key={`${index}-{item.id}`}/>
            })}
            { nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load Next</button>}
            </React.Fragment>
}