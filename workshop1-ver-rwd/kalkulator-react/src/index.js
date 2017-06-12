import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OrderCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrow = this.handleArrow.bind(this);
    this.handleTypeChoice = this.handleTypeChoice.bind(this);
    this.handleColorChoice = this.handleColorChoice.bind(this);
    this.handleFabricChoice = this.handleFabricChoice.bind(this);
    this.handleTransportCheckbox = this.handleTransportCheckbox.bind(this);
    this.state = {optionList1: 0, optionList2: 0, optionList3: 0, chairType: '', chairTypePrice: 0, chairColor: '', colorPrice: 0, chairFabric: '', fabricFactor: 0, transport: 0};
  }

  render() {
    return (
        <div className="row">
            <div className="col-6">
                <div className="section-header">
                    <h1>skomponuj swoje krzesło</h1> 
                </div>
                <div className="drop_down_list">
                    <span className="list_label">Wybierz typ</span>
                    <span className="list_arrow" onClick={this.handleArrow}></span>
                    <OptionList visibility={this.state.optionList1} items={[["Clair", 300], ["Margarita", 320], ["Selena", 350], ["Symphony", 400]]} handler={this.handleTypeChoice} />
                </div>
                <DropDownList items={[["Clair", 300], ["Margarita", 320], ["Selena", 350], ["Symphony", 400]]} handler={this.handleTypeChoice}/>
                <DropDownList items={[["Czerwony",0], ["Czarny",0], ["Pomarańczowy",20]]} handler={this.handleColorChoice}/>
        
        
        
                <div className="drop_down_list">
                    <span className="list_label">Wybierz kolor</span>
                    <span className="list_arrow" onClick={this.handleArrow}></span>
                    <OptionList visibility={this.state.optionList2} items={[["Czerwony",0], ["Czarny",0], ["Pomarańczowy",20]]} handler={this.handleColorChoice} />
                </div>
                <div className="drop_down_list">
                    <span className="list_label">Wybierz materiał</span>
                    <span className="list_arrow" onClick={this.handleArrow}></span>
                    <ul className="list_panel disappear">
                        <li data-factor='0' onClick={this.handleFabricChoice}>Tkanina</li>
                        <li data-factor='0.25' onClick={this.handleFabricChoice}>Skóra</li>
                    </ul>
                </div>
                <div className="checkbox check-box">
                    <input type="checkbox" id="transport" data-transport-price="200" onChange={this.handleTransportCheckbox}/>
                    <label htmlFor="transport">Transport</label>
                </div>
            </div>    
            <SummaryPanel chairType={this.state.chairType} chairTypePrice={this.state.chairTypePrice} chairColor={this.state.chairColor} colorPrice={this.state.colorPrice} chairFabric={this.state.chairFabric} fabricFactor={this.state.fabricFactor} transport={this.state.transport}/>
        </div>
    );
  }
    
    handleArrow(e) {
        (((this.state.optionList1 !== 1) && (this.setState({optionList1: 1}))) ||
        ((this.state.optionList1 !== 0) && (this.setState({optionList1: 0}))));
        e.target.classList.toggle('turn_upside_down');
    }
    
    handleListPanel(element) {
        element.parentElement.parentElement.firstElementChild.innerHTML = element.innerHTML;
        element.parentElement.parentElement.classList.add('chosen');
    }
    
    handleTypeChoice(e){
        this.handleListPanel(e.target);
        this.setState({chairType: e.target.innerHTML,  chairTypePrice: e.target.dataset.price});
    }
    
    handleColorChoice(e) {
        this.handleListPanel(e.target);
        this.setState({chairColor: e.target.innerHTML,  colorPrice: e.target.dataset.price});
    }
    
    handleFabricChoice(e) {
        this.handleListPanel(e.target);
        this.setState({chairFabric: e.target.innerHTML,  fabricFactor: e.target.dataset.factor});
    }
    
    handleTransportCheckbox(e) {
        this.setState({transport: e.target.checked * 200});
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
                    <li className="title">{this.props.chairType}</li>
                    <li className="color">{this.props.chairColor}</li>
                    <li className="pattern">{this.props.chairFabric}</li>
                    <li className="transport">{(this.props.transport !== 0) ? 'Transport' : ''}</li>
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

class ListItem extends React.Component {
    render() {
        return <li data-price={this.props.dataValue} onClick={this.props.handler}>{this.props.value}</li>
    }
}
                     
class OptionList extends React.Component {
    render() {
        return (
            (this.props.visibility !== 0) && 
            <ul className="list_panel">
                {this.props.items.map(item => (
                    <ListItem key={item[0]} dataValue={item[1]} handler={this.props.handler} value={item[0]} />
                ))}
            </ul>
        )
    }
}

class DropDownList extends React.Component {
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
                <span className="list_label">Wybierz typ</span>
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
                     
ReactDOM.render(<OrderCalculator />, document.getElementById('root'));