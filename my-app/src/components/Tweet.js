import React from "react";

const Tweet = ({ details }) =>{ 

    const {text, id_str} = details;
    const url = `https://twitter.com/${details.user.screen_name}/status/${id_str}`;

    //Get users Retweets and Mentions
    const userMentions = details.entities.user_mentions;
    const retweetedStatus = details.retweeted_status;
    const retweetedStatusUser = retweetedStatus && retweetedStatus.user ? retweetedStatus.user.name : "";
    //Split date to format
    const date = details.created_at.split(" ");
    console.log(date);
    
    return (
        <div className="tweet">
            <p>{text}</p>
            <button>
                {date[2]} {date[1]}. {date[5]}
            </button>
            <br/>
            <a rel="noopener noreferrer" target="_blank" href={url}>Tweet link</a>
            <div className="tweet-retweets">
                <p>Retweets</p>
                <span>
                    {retweetedStatusUser}
                </span>
            </div>

            <div className="tweet-mentions">
                <p>Mentions</p>
                <ul>
                    {userMentions.map((userMention, index) => {
                        return <li key={index}>• {userMention.name}</li>
                    })}
                </ul>
            </div>
        </div>
    );
    
};

export default Tweet;