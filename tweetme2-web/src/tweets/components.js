import React, {useEffect, useState} from 'react'

import {TweetCreate} from './create'
import {Tweet} from './detail'
import {apiTweetDetail} from './lookup'
import {FeedList} from './feed'
import {TweetsList} from './list'



export function FeedComponent(props) {

    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) =>{
     // backend api response handler
           let tempNewTweets = [...newTweets]
           tempNewTweets.unshift(newTweet)
           setNewTweets(tempNewTweets)

        }


    return <div className={props.className} >
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
     <FeedList newTweets={newTweets} {...props}/>
    </div>
}

export function TweetsComponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) =>{
     // backend api response handler
           let tempNewTweets = [...newTweets]
           tempNewTweets.unshift(newTweet)
           setNewTweets(tempNewTweets)

        }


    return <div className={props.className} >
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
     <TweetsList newTweets={newTweets} {...props}/>
    </div>
}


 export function TweetDetailComponent(props) {
    const {tweetId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)

    const handleBackendLookup = (response, status) => {
        if(status === 200){
        setTweet(response)
        }
        else{
        alert('There was an error finding your tweet.')
        }
    }
       useEffect(()=>{
        if (didLookup === false){
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }

    }, [tweetId, didLookup, setDidLookup])

    return tweet === null ? null : <Tweet tweet={tweet} className = {props.className} />
 }

//export function TweetsComponent(props) {
//
//    const textAreaRef = React.createRef()
//    const [newTweets, setNewTweets] = useState([])
//
//    const canTweet = props.canTweet === "false" ? false : true
//    const handleBackendUpdate = (response, status) =>
//        {  // backend api response handler
//           let tempNewTweets = [...newTweets]
//           if (status === 201){
//           tempNewTweets.unshift(response)
//           setNewTweets(tempNewTweets)
//           } else {
//                console.log(response)
//                alert("An error occured please try again")
//           }
//
//        }
//
//    const handleSubmit = (event) => {
//        event.preventDefault()
//        const newVal = textAreaRef.current.value
////        let tempNewTweets = [...newTweets] // copy the new tweets array
//
//
//
//        apiTweetCreate(newVal, handleBackendUpdate)
//
////        createTweet(newVal, (response, status)=> {
////           console.log(response, status)
////           if (status === 201){
////           tempNewTweets.unshift(response)
////           setNewTweets(tempNewTweets)
////           } else {
////                console.log(response)
////                alert("An error occured please try again")
////           }
////
////      })
////
////        setNewTweets(tempNewTweets)
//        textAreaRef.current.value = ''
//    }
//    return <div className={props.className} >
//    {canTweet === true &&<div className='col-12 mb -3'>
//    <form onSubmit={handleSubmit}>
//        <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>
//
//        </textarea>
//        <button type='submit' className='btn btn-primary my-3'>Tweet</button>
//    </form>
//    </div>
//    }
//    <TweetsList newTweets={newTweets} {...props}/>
//    </div>
//}


//export function TweetsList(props) {
//    const [tweetsInit, setTweetsInit] = useState([])
//    const [tweets, setTweets] = useState([])
//    const [tweetsDidSet, setTweetsDidSet] = useState(false) // added because of infinite loop of lookup function
//    //setTweetsInit([...props.newTweets].concat()) commented because infinite loop
//      useEffect(() => {
//        const final = [...props.newTweets].concat(tweetsInit)
//        if (final.length !== tweets.length) {
//        setTweets(final)
//        console.log("tweets", tweets)
//        }
//      }, [props.newTweets, tweets, tweetsInit]) // this is called as the dependency array as on what is the useEffect dependent on
//
//      useEffect(() => {
//      if (tweetsDidSet === false){   //added this if loop to stop lookup loading again and again
//        const handleTweetListLookup = (response, status) => {
//        console.log("response", response)
//        if (status === 200){
//               console.log("yes")
//               setTweetsInit(response)
//               setTweetsDidSet(true)
//                //console.log("tweetsINIt", tweetsInit)
//            } else {
//                alert("There was an error")
//            }
//  }
//    // do my lookup
//    apiTweetList(props.username, handleTweetListLookup)
//    }
//  },[tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])
//
//
//  const handledidRetweet = (newTweet) => {
//    const updateTweetsInit = [...tweetsInit]
//    updateTweetsInit.unshift(newTweet)
//    setTweetsInit(updateTweetsInit)
//    const updateFinalTweets = [...tweets]
//    updateFinalTweets.unshift(tweets)
//    setTweets(updateFinalTweets)
//
//  }
//  return  tweets.map((item, index)=>{
//                //console.log(tweetsInit)
//                return <Tweet tweet={item}
//                didRetweet = {handledidRetweet}
//                className='my-5 py-5 border bg-white text-dark'
//                key={`${index}-{item.id}`}/>
//            })
//
//}
// Shifted this all to buttons.js
//export function ActionBtn(props) {
//     const {tweet, action, didPerformAction} = props
//     const likes = tweet.likes ? tweet.likes :0
//    // const [likes, setLikes] = useState();
////     const [userLike, setUserLike] = useState(false)
//     const className = props.className ? props.className : 'btn btn-primary btn-sm'
//     const actionDisplay = action.display ? action.display : 'Action'
//     //const display = action.type === 'like' ? `${tweet.likes} ${action.display}` : action.display
//     const handleActionBackendEvent = (response, status) =>{
//        console.log(status, response)
//        if((status === 200 || status === 201) && didPerformAction){
//            //setLikes(response.likes)
//            didPerformAction(response, status)
////            setUserLike(true)
//        }
////        if (action.type === 'like') {
////           if(userLike === true) {
////            setLikes(likes - 1)
////            setUserLike(false)
////            } else {
////            setLikes(likes + 1)
////            setUserLike(true)
////            }
//            //likes = tweet.likes + 1
////        }
//     }
//     const handleClick = (event) => {
//        event.preventDefault()
//        apiTweetAction(tweet.id, action.type, handleActionBackendEvent)
////        if (action.type === 'like') {
////           if(userLike === true) {
////            setLikes(likes - 1)
////            setUserLike(false)
////            } else {
////            setLikes(likes + 1)
////            setUserLike(true)
////            }
////            //likes = tweet.likes + 1
////        }
//     }
//     const display = action.type === 'like' ? `${likes} ${actionDisplay}` : action.display
//     return <button className={className} onClick={handleClick}>{display}</button>
//}

//export function ParentTweet(props){
//     const {tweet} = props
//     return tweet.parent ? <div className = 'row'>
//               <div className = 'col-11 mx-auto p-3 border rounded'>
//                <p className='mb-0 text-muted small'>Retweet</p>
//                <Tweet hideActions className = {' '} tweet={tweet.parent} />
//                </div>
//                </div> : null
//}
//
//
//export function Tweet(props) {
//    const {tweet, didRetweet, hideActions} = props
//    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
//    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
//
//    const handlePerformAction = (newActionTweet, status) => {
//        if (status === 200){
//            setActionTweet(newActionTweet)
//        } else if (status === 201) {
//        //let the tweet list know
//            if (didRetweet){
//                didRetweet(newActionTweet)
//            }
//        }
//
//    }
//    return <div className={className}>
//        <div>
//                <p> {tweet.id} - {tweet.content} </p>
//                <ParentTweet tweet={tweet} />
//        </div>
//        {(actionTweet && hideActions !== true) && <div className = 'btn btn-group'>
//            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"like", display:"Likes"}} />
//            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"unlike", display:"Unlike"}} />
//            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}} />
//
//        </div>
//       }
//    </div>
//}
