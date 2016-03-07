import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import classnames from 'classnames'
import "./styles/simple.scss"

const initialState = {
  players: [
    {display: "John Wall"},
    {display: "Michael Jordan"},
    {display: "Steph Curry"},
    {display: "Nick Young"},
    {display: "Marcelo Huertas"}
  ],
  activePlayer: {display: "Marcelo Huertas"}
};

function playerReducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_PLAYER':
      return Object.assign({}, state, {
        activePlayer: action.activePlayer,
      })
    default:
      return state
  }
}

const store = createStore(playerReducer)

class NakedApp extends Component {
  constructor(props) {
    super(props)
    this.handleNewActivePlayer = this.handleNewActivePlayer.bind(this);
  }
  render() {
    return (
      <div className="container">
        <ActivePlayerDisplay player={this.props.activePlayer} />

        <PlayersList
          players={this.props.players}
          activePlayer={this.props.activePlayer}
          onNewActivePlayer={this.handleNewActivePlayer}
        />
      </div>
    )
  }
  handleNewActivePlayer(newPlayer) {
    this.props.dispatch({
      type: 'SET_ACTIVE_PLAYER',
      activePlayer: newPlayer,
    })
  }
}

function mapStateToProps(state) {
  return {
    activePlayer: state.activePlayer,
    players: state.players,
  }
}

const App = connect(mapStateToProps)(NakedApp)

class ActivePlayerDisplay extends Component {

  render() {
    return (
      <h1 className="title">{this.props.player.display}</h1>
    )
  }

}

class PlayersList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {players, activePlayer, onNewActivePlayer} = this.props
    return (
      <div className="players-list">
        {players.map((player) => {
          const playerClasses = classnames('player-row', {active: player.display === activePlayer.display})
          return (
            <div
              onClick={() => onNewActivePlayer(player)}
              className={playerClasses} key={player.display}>
              <p className="display">{player.display}</p>
            </div>
          )
        })}
      </div>
    )
  }

}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector("#react-target"))
