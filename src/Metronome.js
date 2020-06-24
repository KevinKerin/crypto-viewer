import React from 'react'
import ReactDOM from 'react-dom'
import click1 from './click1.wav'
import click2 from './click2.wav'
import './Metronome.css'

class Metronome extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        }

        this.click1 = new Audio(click1)
        this.click2 = new Audio(click2)

    }

    startStop = () => {
        if(this.state.playing){
            clearInterval(this.timer)
            this.setState({
                playing: false
            })
        } else {
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000)
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }

    playClick = () => {
        const {beatsPerMeasure, count} = this.state

        if (count % beatsPerMeasure === 0){
            this.click2.play()
        } else {
            this.click1.play()
        }

        this.setState((prevProps) => ({
            count: (prevProps.count + 1) % prevProps.beatsPerMeasure
        }))

    }

    handleBpmChange = event => {
        const bpm = event.target.value

        if(this.state.playing){
            clearInterval(this.timer)
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000)

            this.setState({
                count: 0,
                bpm
            })
        } else {
            this.setState({
                bpm
            })
        }
    }

    render(){
        const {bpm, playing} = this.state
        // let bpm = 100
        // let playing = false

        return (
            <div className="metronome">
                <div className="slider">
                    <div>{bpm} BPM</div>
                    <input onChange={this.handleBpmChange} min="60" max="240" type="range" value={bpm}></input>
                </div>
                <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
            </div>
        )
    }
}

export default Metronome