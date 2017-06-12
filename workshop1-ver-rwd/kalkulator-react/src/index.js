import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OrderCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleTypeChoice = this.handleTypeChoice.bind(this);
    this.handleColorChoice = this.handleColorChoice.bind(this);
    this.handleFabricChoice = this.handleFabricChoice.bind(this);
    this.handleTransportCheckbox = this.handleTransportCheckbox.bind(this);
    this.state = {chairType: '', chairTypePrice: 0, chairColor: '', colorPrice: 0, chairFabric: '', fabricFactor: 0, transport: 0};
  }

  render() {
    return (
        <div className="row">
            <div className="col-6">
                <div className="section-header">
                    <h1>skomponuj swój fotel</h1> 
                </div>
                <OptionPicker category="typ" items={[["Clair", 300], ["Margarita", 320], ["Selena", 350], ["Symphony", 400]]} handler={this.handleTypeChoice}/>
                <OptionPicker category="kolor" items={[["Czerwony",0], ["Czarny",0], ["Pomarańczowy",20]]} handler={this.handleColorChoice}/>
                <OptionPicker category="materiał" items={[["Tkanina",0], ["Skóra",0.25]]} handler={this.handleFabricChoice}/>
                <div className="checkbox check-box">
                    <input type="checkbox" id="transport" data-transport-price="200" onChange={this.handleTransportCheckbox}/>
                    <label htmlFor="transport">Transport</label>
                </div>
            </div>    
            <SummaryPanel chairType={this.state.chairType} chairTypePrice={this.state.chairTypePrice} chairColor={this.state.chairColor} colorPrice={this.state.colorPrice} chairFabric={this.state.chairFabric} fabricFactor={this.state.fabricFactor} transport={this.state.transport}/>
        </div>
    );
  }
        
    handleListPanel(element) {
        element.parentElement.parentElement.firstElementChild.innerHTML = element.innerHTML;
        element.parentElement.parentElement.classList.add('chosen');
    }
    
    handleTypeChoice(e){
        this.handleListPanel(e.target);
        this.setState({chairType: e.target.innerHTML,  chairTypePrice: e.target.dataset.price, dropdownVisibility1: 0});
    }
    
    handleColorChoice(e) {
        this.handleListPanel(e.target);
        this.setState({chairColor: e.target.innerHTML,  colorPrice: e.target.dataset.price});
    }
    
    handleFabricChoice(e) {
        this.handleListPanel(e.target);
        this.setState({chairFabric: e.target.innerHTML,  fabricFactor: e.target.dataset.price});
    }
    
    handleTransportCheckbox(e) {
        this.setState({transport: e.target.checked * 200});
    }
}
               
class OptionPicker extends React.Component {
    constructor(props) {
        super();
        this.arrowHandler = this.arrowHandler.bind(this);
        this.state = {optionsVisibility: 0};
    }
    
    arrowHandler(e) {
        (((this.state.optionsVisibility !== 1) && (this.setState({optionsVisibility: 1}))) ||
        ((this.state.optionsVisibility !== 0) && (this.setState({optionsVisibility: 0}))));
        e.target.classList.toggle('turn_upside_down');
    }
    
    render() {
        return (
            <div className="drop_down_list">
                <span className="list_label">Wybierz {this.props.category}</span>
                <span className="list_arrow" onClick={this.arrowHandler}></span>
                {(this.state.optionsVisibility !== 0) && <ul className="list_panel">
                {this.props.items.map(item => (
                    <ListItem key={item[0]} dataValue={item[1]} handler={this.props.handler} value={item[0]} />
                ))}
            </ul>}
            </div>
        )
    }
}

class ListItem extends React.Component {
    render() {
        return <li data-price={this.props.dataValue} onClick={this.props.handler}>{this.props.value}</li>
    }
}

class SummaryPanel extends React.Component {
  render() {
    return (
        <div className="col-6">
            <div className="section-header">
                <h1>PODSUMOWANIE</h1>
            </div>
            <div className="summary_panel">
                <ul className="panel_left">
                    {(this.props.chairType !== '') && <li className="title">{this.props.chairType}</li>}
                    {(this.props.chairColor !== '') && <li className="color">{this.props.chairColor}</li>}
                    {(this.props.chairFabric !== '') && <li className="pattern">{this.props.chairFabric}</li>}
                    {(this.props.transport !== 0) && <li className="transport">Transport</li>}
                </ul>
                <ul className="panel_right">
                    {(this.props.chairTypePrice !== 0) && <li className="title value">{this.props.chairTypePrice}</li>}
                    {(this.props.colorPrice !== 0) && <li className="color value">{this.props.colorPrice}</li>}
                    {(this.props.fabricFactor !== 0) && <li className="pattern value">{parseInt(this.props.chairTypePrice * this.props.fabricFactor, 10)}</li>}
                    {(this.props.transport !== 0) && <li className="transport value">{this.props.transport}</li>}
                </ul>
                <div className="sum_label">SUMA</div>
                     {(this.props.chairTypePrice !== 0) && <div className="sum">{parseInt(this.props.chairTypePrice, 10) + parseInt(this.props.chairTypePrice * this.props.fabricFactor, 10) + parseInt(this.props.colorPrice, 10) + parseInt(this.props.transport, 10)}</div>}
            </div>
            <button>Zamawiam</button>
        </div>
    );
  }
}
                     
ReactDOM.render(<OrderCalculator />, document.getElementById('root'));