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
    this.state = {chairType: '', chairTypePrice: 0, chairColor: '', colorPrice: 0, chairFabric: '', fabricFactor: 0, transport: 0};
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
                    <ul className="list_panel disappear">
                        <li data-price='300' onClick={this.handleTypeChoice}>Clair</li>
                        <li data-price='320' onClick={this.handleTypeChoice}>Margarita</li>
                        <li data-price='350' onClick={this.handleTypeChoice}>Selena</li>
                        <li data-price='400' onClick={this.handleTypeChoice}>Symphony</li>
                    </ul>
                </div>
                <div className="drop_down_list">
                    <span className="list_label">Wybierz kolor</span>
                    <span className="list_arrow" onClick={this.handleArrow}></span>
                    <ul className="list_panel disappear">
                        <li data-price='0' onClick={this.handleColorChoice}>Czerwony</li>
                        <li data-price='0' onClick={this.handleColorChoice}>Czarny</li>
                        <li data-price='0' onClick={this.handleColorChoice}>Pomarańczowy</li>
                    </ul>
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
        e.target.nextElementSibling.classList.toggle('disappear');
        e.target.classList.toggle('turn_upside_down');
    }
    
    handleListPanel(element) {
        element.parentElement.parentElement.firstElementChild.innerHTML = element.innerHTML;
        element.parentElement.parentElement.classList.add('chosen');
        element.parentElement.classList.toggle('disappear');
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
                    <li className="title value">{(this.props.chairTypePrice !== 0) ? this.props.chairTypePrice : '' }</li>
                    <li className="color value">{(this.props.colorPrice !== 0) ? this.props.colorPrice : ''}</li>
                    <li className="pattern value">{(this.props.fabricFactor !== 0) ? parseInt(this.props.chairTypePrice * this.props.fabricFactor, 10) : ''}</li>
                    <li className="transport value">{(this.props.transport !== 0) ? this.props.transport : ''}</li>
                </ul>
                <div className="sum_label">SUMA</div>
                <div className="sum">{(this.props.chairTypePrice !== 0) ? (parseInt(this.props.chairTypePrice, 10) + parseInt(this.props.chairTypePrice * this.props.fabricFactor, 10) + parseInt(this.props.transport, 10)) : ''}</div>
            </div>
            <button>Zamawiam</button>
        </div>
    );
  }
}

ReactDOM.render(<OrderCalculator />, document.getElementById('root'));