import React from "react";
import Header from './Header';
import Twitte from "./Twitte";
import axios from 'axios';
import { TaskQueue } from 'cwait';
// import base from '../base';

class App extends React.Component{
    
    state = {
        columns:[
            {position:"First",name:"Versaagency"},
            {position:"Second",name:"RainAgency"},
            {position:"Third",name:"Alexadevs"}],
        columnsPosition:{
            First:1,
            Second:2,
            Third:3,
        },
        numberTwittes:1
    };
    componentWillMount(){
        let columns = localStorage.getItem("columnsPositions");
        let numberTwittes = localStorage.getItem("numberTwittes");
        if(columns){
            

            columns = JSON.parse(columns);
            this.setState({columns:columns});
            
        }
        if(numberTwittes){
            try {
                numberTwittes = parseInt(numberTwittes);
            } catch (error) {
                numberTwittes = 30;
            }
        } else {
            numberTwittes = 30;
        }

        const MAX_SIMULTANEOUS_DOWNLOADS = 3;
        const shortPath = `http://localhost:7890/1.1/statuses/user_timeline.json?count=${numberTwittes}&screen_name=`;
        const urls = [shortPath+'versaagency',shortPath+'RainAgency',shortPath+'alexadevs'];
        const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS);
        const results = Promise.all(urls.map(queue.wrap(async url => await axios.get(url))));
        results.then(twittes => {
            this.setState({ twittes:twittes });
        });    
    }

    goToEditLayout = event => {
        event.preventDefault();
        this.props.history.push(`/editlayout`);
    }
    
    render(){
        // console.log(3);
        return (
            <div>
                <label htmlFor="fold" onClick={this.goToEditLayout}>
                    Edit layout
                </label>
                <div className="twittes">
                    
                <div style={{order:this.state.columnsPosition[this.state.columns[0].position]}}>
                    <Header tagline="Versa Agency"/>
                    <ul className="">
                        { this.state && this.state.twittes &&
                            this.state.twittes[0].data.map(
                                twitte => <Twitte 
                                    key={twitte.id}
                                    index={twitte.id}
                                    details={twitte} 
                                    />
                            )
                        }
                    </ul>
                </div>
                <div style={{order:this.state.columnsPosition[this.state.columns[1].position]}}>
                <Header tagline="Rain Agency"/>
                <ul className="">
                { this.state && this.state.twittes &&
                    this.state.twittes[1].data.map(
                        twitte => <Twitte 
                            key={twitte.id}
                            index={twitte.id}
                            details={twitte} 
                            />
                    )
                }
            </ul>
                </div>
                <div style={{order:this.state.columnsPosition[this.state.columns[2].position]}}>
                <Header tagline="Alex Adevs"/>
                <ul className="">
                { this.state && this.state.twittes &&
                    this.state.twittes[2].data.map(
                        twitte => <Twitte 
                            key={twitte.id}
                            index={twitte.id}
                            details={twitte} 
                            />
                    )
                }
            </ul>
                </div>
            </div>
            </div>
        );
    }
}

export default App;