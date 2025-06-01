//HTML Element Variables
const divRoot = document.getElementById("root");

//HTML React Element Variables
const reactDivRoot = ReactDOM.createRoot(divRoot);

//Variables


//Classes
class TwentyFiveTimer extends React.Component {
    timerId = null;
    constructor(props){
        super(props);
        this.audioRef = React.createRef();
        this.state = {
            sessionLength: 25,         
            breakLength: 5,            
            currentStatus: "paused",   
            currentTimer: "Session",   
            remainingTime: 25 * 60  
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    incrementBreak(){
        this.setState((prevState) => {
            if (prevState.breakLength < 60 && this.state.currentStatus === "paused") {
                const newBreakLength = prevState.breakLength + 1;
                return {
                    breakLength: newBreakLength,
                    remainingTime: prevState.currentTimer === "Break" ? newBreakLength * 60 : prevState.remainingTime
                };
            }
        });
    }
    decrementBreak(){
        this.setState((prevState) => {
            if (prevState.breakLength > 1 && this.state.currentStatus === "paused") {
                const newBreakLength = prevState.breakLength - 1;
                return {
                    breakLength: newBreakLength,
                    remainingTime: prevState.currentTimer === "Break" ? newBreakLength * 60 : prevState.remainingTime
                };
            }
        });
    }
    incrementSession() {
        this.setState((prevState) => {
            if (prevState.sessionLength < 60 && this.state.currentStatus === "paused") {
                const newSessionLength = prevState.sessionLength + 1;
                return {
                    sessionLength: newSessionLength,
                    remainingTime: prevState.currentTimer === "Session" ? newSessionLength * 60 : prevState.remainingTime
                };
            }
        });
    }
    decrementSession() {
        this.setState((prevState) => {
            if (prevState.sessionLength > 1 && this.state.currentStatus === "paused") {
                const newSessionLength = prevState.sessionLength - 1;
                return {
                    sessionLength: newSessionLength,
                    remainingTime: prevState.currentTimer === "Session" ? newSessionLength * 60 : prevState.remainingTime
                };
            }
        });
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    startPauseTimer() {
        if (this.state.currentStatus === "paused") {
            this.setState({ currentStatus: "running" }, () => {
                this.functionTimer();
            });
        } else {
            this.setState({ currentStatus: "paused" }, () => {
                clearInterval(this.timerId);
            });
        }
    }
    functionTimer() {
        this.timerId = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.remainingTime > 0) {
                    return { remainingTime: prevState.remainingTime - 1 };
                } else {
                    this.audioRef.current.play();
                    if (prevState.currentTimer === "Session") {
                        return {
                            currentTimer: "Break",
                            remainingTime: prevState.breakLength * 60
                        };
                    } else {
                        return {
                            currentTimer: "Session",
                            remainingTime: prevState.sessionLength * 60
                        };
                    }
                }
            });
        }, 1000);
    }
    resetTimer(){
        clearInterval(this.timerId);
        this.audioRef.current.pause();
        this.audioRef.current.currentTime = 0;
        this.setState({
            sessionLength: 25,         
            breakLength: 5,            
            currentStatus: "paused",   
            currentTimer: "Session",   
            remainingTime: 25 * 60  
        })
    }
    render(){
        return(
            <div id="twenty-five-timer-div" className="container-fluid">
                <div id="controls-div">
                    <div className="row">
                        <h4 id="break-label" className="col-6">Break Length</h4>
                        <h4 id="session-label" className="col-6">Session Length</h4>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <button 
                            id="break-decrement" 
                            className="btn col-1" 
                            onClick={()=>this.decrementBreak()} >
                                <i className="bi bi-arrow-down"></i>
                        </button>
                        <h4 
                            id="break-length" 
                            className="col-2" >
                                {this.state.breakLength}
                        </h4>
                        <button 
                            id="break-increment" 
                            className="btn col-1" 
                            onClick={()=>this.incrementBreak() } >
                                <i className="bi bi-arrow-up"></i>
                        </button>
                        <div className="col-2"></div>
                        <button 
                            id="session-decrement" 
                            className="btn col-1" 
                            onClick={()=>this.decrementSession()} >
                                <i className="bi bi-arrow-down"></i>
                        </button>
                        <h4 
                            id="session-length" 
                            className="col-2">
                                {this.state.sessionLength}
                        </h4>
                        <button 
                            id="session-increment" 
                            className="btn col-1" 
                            onClick={()=>this.incrementSession()} >
                                <i className="bi bi-arrow-up"></i>
                        </button>
                        <div className="col-1"></div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-2"></div>
                        <button 
                            id="start_stop" 
                            className="btn col-2" 
                            onClick={()=>this.startPauseTimer()}>
                                {this.state.currentStatus === "paused" ? "Start" : "Pause"}
                        </button>
                        <div className="col-4"></div>
                        <button 
                            id="reset" 
                            className="btn col-2 arrow" 
                            onClick={()=>this.resetTimer()}>
                                Reset
                        </button>
                        <div className="col-2"></div>
                        <audio id="beep" ref={this.audioRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
                    </div>
                </div>
                <div id="timer-div">
                    <h4 id="timer-label">{this.state.currentTimer}</h4>
                    <h3 id="time-left">{this.formatTime(this.state.remainingTime)}</h3>
                </div>
            </div>
        )
    }
}

//Functions


//Event Listener


//Initialization
reactDivRoot.render(<TwentyFiveTimer />);