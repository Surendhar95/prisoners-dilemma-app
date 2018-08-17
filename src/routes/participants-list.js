import React from 'react'

class ParticipantsList extends React.Component {
  constructor() {
    super()
    this.state = {
      password: '',
      error: null,
      done: null,
      started: false
    }
    this.getParticipants().then(data => {
      this.setState({ participants: data.participants })
    })
  }

  onChangeInput = e => {
    const password = e.target.value
    this.setState({ password })
  }

  getParticipants = async () => {
    const response = await fetch('http://localhost:3010/participants', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    return response.json()
  }

  checkPassword = async () => {
    const { password } = this.state
    const response = await fetch('http://localhost:3010/check-password', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status >= 400) {
      response.json().then(responseData => {
        this.setState({ error: responseData.error })
      })
    } else {
      this.setState({ done: true, error: null })
    }
  }

  startTournament = async () => {
    const { password } = this.state
    const response = await fetch('http://localhost:3010/start', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status >= 400) {
      response.json().then(responseData => {
        this.setState({ error: responseData.error })
      })
    } else {
      this.setState({ started: true })
    }
  }

  start = e => {
    e.preventDefault()

    this.startTournament()
  }

  render() {
    const { participants, password, error, done, started } = this.state
    return (
      <div style={{ display: 'block', textAlign: 'center' }}>
        <form onSubmit={this.submit}>
          <div className="form">
            <div className="form-error">{error || (done ? 'OK' : '')}</div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="alias">Enter the master password</label>
              </div>
              <div className="form-field">
                <input
                  id="alias"
                  type="text"
                  name="alias"
                  value={password}
                  onChange={this.onChangeInput}
                />
              </div>
            </div>
            <br />
            <div className="form-buttons">
              <button type="submit">Enter</button>
            </div>
          </div>
        </form>
        <br />
        <br />
        <div className="form-buttons">
          <button type="button" onClick={this.start} disabled={!done}>
            Start
          </button>
          <div className="form-error">
            {started ? 'Tournament Started' : ''}
          </div>
        </div>
        <div>
          <table>
            <th style={{ textAlign: 'center' }}>
              <td>Participants</td>
            </th>
            {participants &&
              participants.map(participant => (
                <tr>
                  <td>{participant.alias}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    )
  }
}

export default ParticipantsList
