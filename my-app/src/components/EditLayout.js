import React from 'react';


class EditLayout extends React.Component{

    numberOfTwittes = React.createRef();

    state = {
        listOption:[{name:"First"},{name:"Second"},{name:"Third"}],
        columns:[
            {position:"First",name:"Versaagency"},
            {position:"Second",name:"RainAgency"},
            {position:"Third",name:"Alexadevs"}],
        numberTwittes: 30
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.goToStore = this.goToStore.bind(this);
        this.changeNumberTwittes = this.changeNumberTwittes.bind(this);
        
      }

    goToStore = event => {
        event.preventDefault();
        this.props.history.push(`/`);
    }
    
    componentWillMount(){
        const columns = localStorage.getItem("columnsPositions");
        let numberTwittes = localStorage.getItem("numberTwittes");
        if(columns){
            this.setState({ columns: JSON.parse(columns) });
        }

       
        if(numberTwittes){
            try {
                numberTwittes = parseInt(numberTwittes);
            } catch (error) {
                numberTwittes = 30;
            }
            this.setState({ numberTwittes: numberTwittes });
        } else {
            this.setState({ numberTwittes: 30 });
        }
    }

    handleChange(columnToEdit, e) {
    
        if(columnToEdit && e){
            let columns = [...this.state.columns];
            let columnToChange = columns.find(column => e.target.value === column.position );
            let positionTochange = columnToEdit.position;
            let positionToEdit = columnToChange.position;
            let columnWithoutUpdate = columns.find(
                column => columnToChange.name !== column.name && columnToEdit.name !== column.name
            );
            columnToEdit.position = positionToEdit;
            columnToChange.position = positionTochange;
            let newArray = [columnToEdit, columnToChange, columnWithoutUpdate];
            const first = newArray.find(item => item.name === "Versaagency");
            const second = newArray.find(item => item.name === "RainAgency");
            const third = newArray.find(item => item.name === "Alexadevs");
            newArray = [first,second,third];
            console.log(newArray);
            this.setState({columns:newArray});
            localStorage.setItem("columnsPositions",JSON.stringify(newArray))
        }
    }

    changeNumberTwittes(e){
        if(e){
            localStorage.setItem("numberTwittes",e.target.value);
        } else{
            localStorage.setItem("numberTwittes",30);
        }
    }
    
    render(){
        return (
            <div> 
                <h2 className="titleForm"> Edit Layout </h2>             
                <form className="store-selector fish-edit" onSubmit={this.goToStore}>

                    <h3 className="titleForm"> Set order of column </h3>   

                    <div className="titleForm-selectOrder">
                        <span> Versaagency </span>
                        <select name="Versaagency" value={this.state.columns[0].position} onChange={ (e) => this.handleChange(this.state.columns[0], e) }>
                            { this.state.listOption.map((option, index) =>
                                <option key={option.name} >
                                    {option.name}
                                </option>
                            )}
                        </select>
                    </div>
                     <div className="titleForm-selectOrder">
                        <span> RainAgency </span>
                        <select name="RainAgency" value={this.state.columns[1].position} onChange={ (e) => this.handleChange(this.state.columns[1], e) }>
                            { this.state.listOption.map((option, index) =>
                                <option key={option.name} >
                                    {option.name}
                                </option>
                            )}
                        </select>
                    </div>
                   <div className="titleForm-selectOrder">
                        <span> Alexadevs </span>
                        <select name="Alexadevs" value={this.state.columns[2].position} onChange={ (e) => this.handleChange(this.state.columns[2], e) }>
                        { this.state.listOption.map((option, index) =>
                            <option key={option.name} >
                                {option.name}
                            </option>
                        )}
                        </select>
                    </div>

                    <h3 className="titleForm"> Number of tweets  </h3>   

                    <input name="numberOfTwittes" 
                        type="number" onChange={ this.changeNumberTwittes }
                        placeholder="The number of tweets shown in each column"  
                        min="1" max="30" defaultValue={this.state.numberTwittes}/>
                    <button type="submit">Save config</button>
                </form>
            </div>
            
        );
    }
}

export default EditLayout;