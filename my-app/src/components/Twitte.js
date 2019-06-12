import React from "react";

class Twitte extends React.Component{
    
    render(){
        const {text} = this.props.details;
        const urls = this.props.details.entities.urls;
        const url = urls.length > 0 ? urls[0].url : "#";
        //Get users Retweets and Mentions
        const userMentions = this.props.details.entities.user_mentions;
        const retweetedStatus = this.props.details.retweeted_status;
        const retweetedStatusUser = retweetedStatus && retweetedStatus.user ? retweetedStatus.user.name : "";
        //4 jun. 2019
        const date = this.props.details.created_at.split(" ");
        
        return (
            <div className="menu-fish">
                <p><a rel="noopener noreferrer" target="_blank" href={url}>{text}</a></p>
                <button>
                    {date[2]} {date[1]}. {date[5]}
                </button>
                <p>Retweets</p>
                <span>
                    {retweetedStatusUser}
                </span>
                <p>Mentions</p>
                <ul>
                    {userMentions.map((userMention, index) => {
                        return <li key={index}>{userMention.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Twitte;