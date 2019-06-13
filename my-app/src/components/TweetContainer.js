
import React from "react";
import Tweet from "./Tweet";

const TweetContainer = (props) => {
    return (
        <ul className="">
            { 
                props.twittes.map(
                    tweet => <Tweet 
                        key={tweet.id}
                        index={tweet.id}
                        details={tweet} 
                        />
                )
            }
        </ul>
    )
}

export default TweetContainer;