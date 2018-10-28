import React, { Component } from "react";
//import Audio from "./Audio";

export default class AudioPlayer extends Component {
  state = {
    playing: false
  };
  ref = React.createRef();

  togglePlay = () => {
    if (this.state.playing) {
      this.ref.current.pause();
    } else {
      this.ref.current.play();
    }
    this.setState({ playing: !this.state.playing });
  };
  render() {
    const { src, title, author } = this.props;
    return (
      <div className="header">
        <audio src={src} ref={this.ref} />
        <div
          className={`btn-play ${this.state.playing ? "playing" : ""}`}
          onClick={this.togglePlay}
        />

        <div className="metadata">
          <p className="title">{title}</p>
          <a href="/" className="author" role="button">
            {author}
          </a>

          <div className="seekbar">
            <progress value="5" max="30" />
          </div>
        </div>
      </div>
    );
  }
}
