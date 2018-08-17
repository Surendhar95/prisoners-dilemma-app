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
		this.getParticipants().then((data) => {
			this.setState({ participants: data.participants })
		})

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
	      body: JSON.stringify({password: password}),
	      credentials: 'include',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    if (response.status >= 400) {
	      response.json().then(function(responseData) {
	        this.setState({ error: responseData.error })
	      }.bind(this))
	    } else {
	      this.setState({ done: true, error: null })
	    }
	}

	startTournament = async () => {
		const { password } = this.state
	    const response = await fetch('http://localhost:3010/start', {
	      method: 'POST',
	      mode: 'cors',
	      body: JSON.stringify({password: password}),
	      credentials: 'include',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    if (response.status >= 400) {
	      response.json().then(function(responseData) {
	        this.setState({ error: responseData.error })
	      }.bind(this))
	    } else {
	      this.setState({ started: true })
	    }
	}

	onChangeInput = (e) => {
		var password = e.target.value
		this.setState({ password })
	}

	submit = (e) => {
		e.preventDefault()
		const { password } = this.state
		if (password.length >= 8 )
			this.checkPassword()
		else this.setState({ error: 'Password should be greater than or equal to 8 charaters' })
	}

	start = (e) => {
		e.preventDefault()

		this.startTournament()
	}

	render() {
		const { participants, password, error, done, started } = this.state
		return (
			<div style={{ display: 'block', textAlign: 'center' }}>
				<form onSubmit={this.submit}>
			        <div className="form">
			          <div className="form-error">{error ? error : done ? 'OK' : ''}</div>
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
			          <br/>
			          <div className="form-buttons">
			            <button type="submit">Enter</button>
			          </div>
			        </div>
			      </form>
			      <br/>
			      <br/>
			      <div className="form-buttons">
		            <button onClick={this.start} disabled={!done}>Start</button>
			        <div className="form-error">{started ? 'Tournament Started' : ''}</div>
		        </div>
		        <div>
					<table>
						<th style={{textAlign: 'center'}}>
							<td>Participants</td>
						</th>
						{
							participants
							&&
							participants.map((participant, index) => 
								<tr>
									<td>
										{ participant.alias }
									</td>
								</tr>
							)
						}
						
					</table>
				</div>
				
			</div>
		)
	}
}

export default ParticipantsList