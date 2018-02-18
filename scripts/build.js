'use strict'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let headers = ["company", "covering", "type", "metal level", "drugs", "primary care visits", "yearly deductible", "price", ""];
let body = [
    {
        company: 'Insurcom',
        covering: 'Health',
        type: 'PPO',
        metal: 'Platinum',
        drugs: '$15',
        visits: '$75',
        deductible: '$6000',
				price: '$356', 
				color: '#999999',
				rating: 5,
				maxRating: 5
    },
    {
        company: 'Health Ins',
        covering: 'All-in-one',
        type: 'HMO',
        metal: 'Silver',
        drugs: '100%',
        visits: '$45',
        deductible: '$4500',
				price: '$611', 
				color: '#ADC1C4',
		rating: 3,
		maxRating: 5
    },
    {
        company: 'Dentalife',
        covering: 'Dental',
        type: 'EPO',
        metal: 'Gold',
        drugs: '100%',
        visits: '$75',
        deductible: '$5000',
				price: '$283',
				color: '#EDAC5B',
		rating: 4,
		maxRating: 5
    },
    {
        company: 'Insurcom',
        covering: 'Vision',
        type: 'POS',
        metal: 'Bronze',
        drugs: '100%',
        visits: '$60',
        deductible: '$2600',
				price: '$214',
				color: '#AB6340',
		rating: 5,
		maxRating: 5
    },
    {
        company: 'Medicon',
        covering: 'Health',
        type: 'PPO',
        metal: 'Catastrophic',
        drugs: '$20',
        visits: '40%',
        deductible: '$6000',
				price: '$300',
				color: '#CA1D25',
		rating: 5,
		maxRating: 5
    },
    {
        company: 'Health Ins',
        covering: 'Dental',
        type: 'POS',
        metal: 'Platinum',
        drugs: '$15',
        visits: '$75',
        deductible: '$5000',
				price: '$234',
				color: '#808080',
		rating: 3,
		maxRating: 5
    },
    {
        company: 'Insurcom',
        covering: 'Health',
        type: 'HMO',
        metal: 'Gold',
        drugs: '100%',
        visits: '$45',
        deductible: '$4500',
				price: '$366',
				color: '#E79124',
		rating: 5,
		maxRating: 5
    },
    {
        company: 'Medicon',
        covering: 'All-in-all',
        type: 'EPO',
        metal: 'Catastrophic',
        drugs: '$15',
        visits: '50%',
        deductible: '$2600',
		price: '$371',
		color: '#CA1D25',
		rating: 5,
		maxRating: 5
    },
];

const Rating = ({maxRating, rating}) => {
	const stars = [];
	for (let i = 1; i <= maxRating; i++){
		stars.push(
			<span key={i} className={i <= rating ? 'ratingOn' : 'ratingOff'}></span>
		)
	}
	return (
		<div className="Rating">
		{stars}
	</div>
	)
	
}

class Top extends Component {
	constructor(props) {
		super(props);
		this.handleTable = this.handleTable.bind(this);
		this.handleCard = this.handleCard.bind(this);
	}
	handleTable(){
		this.props.changeState(false)
	}
	handleCard() {
		this.props.changeState(true)
	}
	render() {
		return (
			<div className="Top">
				<div className="title">Insurance list:</div>
				<div className="toggle_icons">
					<div className="icon_table" onClick={this.handleTable}></div>
					<div className="icon_card" onClick={this.handleCard}></div>
				</div>
			</div>
		)
	}
}
const TableHeaders = ({headers}) => {
	return (
		<thead>
			<tr>
				{headers.map(function (header, index) {
					return <th key={index}>{header}</th>
				})}
			</tr>
		</thead>
	)
}
const TableBodyItem = ({body}) => {
	let arr = [];
	
	for (let i = 0; i < body.length; i++) {
		let row = body[i];
		let color = { background: row.color }
		arr.push(<tr key={i}>
			<td>
				<div className="circle inline-block">
					<img src={'img/' + i + '.png'} />
				</div>
				<div className="inline-block">
						<div className="name">{row.company}</div>
					<div className="rating">
					<Rating rating={row.rating} maxRating={row.maxRating} />
					</div>
				</div>
			</td>
			<td>{row.covering}</td>
			<td>{row.type} <div className="help"></div></td>
			<td><div style={color} className="color"></div>{row.metal}<div className="help ml-5"></div></td>
			<td>{row.drugs}</td>
			<td>{row.visits}</td>
			<td>{row.deductible}</td>
			<td>{row.price}/mon</td>
			<td>
					<button className="overview">OVERVIEW</button>
					<button className="buy">BUY</button>
			</td>
		</tr>)
  }
	return (
		<tbody>
			{arr}
		</tbody>
	)
}
const Table = ({headers, body}) => {
	return (
		<table className="Table">
			<TableHeaders headers={headers} />
			<TableBodyItem body={body} />
		</table>
	)
    
}
const Card = ({body, headers}) => {
	let arr = [];
	for (let i = 0; i < body.length; i++) {
		let row = body[i];
		let color = { background: row.color }
		let header = headers
		arr.push(
			<div className="Card" key={i}>
				<div className="card-name">
					<div className="circle inline-block">
					<img src={'img/'+ i + '.png'} />
					</div>
					<div className="inline-block">
						<div className="name">{row.company}</div>
						<div className="rating">
							<Rating rating={row.rating} maxRating={row.maxRating} />
						</div>
					</div>
				</div>
				<div className="card-item">
					<div className="card-item-header">{header[1]}</div>
					<div className="card-item-body">{row.covering}</div>
				</div>
				<div className="card-item">
					<div className="card-item-header">{header[2]}</div>
					<div className="card-item-body flex">	
						{row.type}
						<div className="help ml-5"></div>
					</div>
				</div>
				<div className="card-item">
					<div className="card-item-header">{header[3]}</div>
					<div className="card-item-body flex">
					<div style={color} className="color"></div>
						{row.metal}
						<div className="help ml-5"></div></div>
				</div>
				<div className="card-item">
					<div className="card-item-header flex">
						<div className="help mr-5"></div>
						{header[4]}
					</div>
					<div className="card-item-body">{row.drugs}</div>
				</div>
				<div className="card-item">
					<div className="card-item-header flex"><div className="help mr-5"></div>{header[5]}</div>
					<div className="card-item-body">{row.visits}</div>
				</div>
				<div className="card-item">
					<div className="card-item-header flex"><div className="help mr-5"></div>{header[6]}</div>
					<div className="card-item-body">{row.deductible}</div>
				</div>
				<div className="price">{row.price}/<span>mon</span></div>
				<div className="buttons">
						<button className="overview">overview</button>
						<button className="buy">buy</button>
				</div>
			</div >
		)
	}
	return (
		<div className="CardWrap">
			{arr}
		</div>
	)
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card: false
		};
		this.changeCardState = this.changeCardState.bind(this);
	}
	changeCardState(val){
		this.setState({
			card: val
		})
	}
	
	render() {		
		let body = null;
		if (this.state.card || document.documentElement.clientWidth < 1410) {
			body = <Card headers={this.props.headers} body={this.props.body} />
		} else {
			body = <Table headers={this.props.headers} body={this.props.body} />
		}
		return (
			<div>
				<Top changeState={this.changeCardState} card={this.state.card} />
				{body}
			</div>
		)
	}
}

ReactDOM.render(<App headers={headers} body={body} />, document.getElementById('root'));

