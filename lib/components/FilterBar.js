 import React, {Component} from 'react'


export default class FilterBar extends React.Component {
  render(){
  return(
    <div className="header">
      <p className="title">Shoot the Breeze</p>
      <input className="filter" placeholder="Filter" onChange={this.props.filterMessages}/>
      <button className="sortBtn" onClick={this.props.sort}>Sort</button>
    </div>
  )
}
}
