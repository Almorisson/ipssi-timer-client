import React, { Component } from 'react';
import moment from 'moment';

class TimerView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: 0,
			paused: false
		};
	}

	renderStartButton = () => {
		return (
			<button
				className="btn btn-raised btn-primary"
				onClick={() => {
					setInterval(() => {
						!this.state.paused &&
							this.setState((prevState) => {
								return {
									timer: prevState.timer + 1000
								};
							});
					}, 1000);
				}}
			>
				Commencer une nouvelle tâche
			</button>
		);
	};

	renderRunningTimer = () => {
		const { timer } = this.state;
		return (
			<div className="row" style={{ display: "flex", alignItems: "center"}}>
				<div className="col-md-6 p-5" style={{display: "flex", flexDirection: "column", justifyItems: "space-betweens"}}>
					<button
						className="btn btn-raised btn-danger"
						onClick={() => {
							this.setState((prevState) => {
								return {
									paused: !prevState.paused
								};
							});
						}}
					>
						Pause
					</button>
                    <button
						className="btn btn-raised btn-dark btn-primary"
						onClick={() => {
							this.setState((prevState) => {
								// save on db
							});
						}}
					>
						Logger cette tâche
					</button>
				</div>
				<div className="col-md-6" style={{alignItems: "center", fontSize: '4.5em' }}>
					{moment.utc(timer).format('HH:mm:ss')}
				</div>
			</div>
		);
	};

	render() {
		const { timer } = this.state;
		console.log(timer);
		return (
			<div style={{ flex: 1 }}>
				<div style={{ flex: 2 }}>{timer > 0 ? this.renderRunningTimer() : this.renderStartButton()}</div>
			</div>
		);
	}
}

export default TimerView;
