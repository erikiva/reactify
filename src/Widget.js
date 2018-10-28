import React, { Component } from "react";
import AudioPlayer from "./AudioPlayer";

export default class Widget extends Component {
  state = {
    img: "//i.scdn.co/image/04da6dfc1f5f45fdeba938a0cc71cf372524fd43",
    src: "//p.scdn.co/mp3-preview/8e9c5ffdc38e91659bfe8b6bd44650dfc25a3d31",
    title: "Hunger of The Pine",
    author: "alt-J"
  };

  componentDidMount() {
    fetch("https://y8iewpw0de.execute-api.us-east-2.amazonaws.com/beta")
      .then(results => results.json())
      .then(data => {
        const token = data.data.access_token;
        this.setState({
          headers: {
            Authorization: "Bearer " + token
          }
        });
      });
  }
  textInput = null;
  setTextInputRef = element => {
    this.textInput = element;
  };
  handleSubmit = e => {
    e.preventDefault();
    const trackName = this.textInput.value;
    fetch("https://api.spotify.com/v1/search?type=track&query=" + trackName, {
      headers: this.state.headers
    })
      .then(results => results.json())
      .then(data => {
        const track = data.tracks.items[1];
        console.log({ track });
        this.setState({
          title: track.name,
          src: track.preview_url,
          img: track.album.images[0].url,
          author: track.artists[0].name
        });
      });
  };

  render() {
    return (
      <div className="widget">
        <AudioPlayer
          src={this.state.src}
          title={this.state.title}
          author={this.state.author}
        />
        <div className="cover">
          <img alt="album cover" src={this.state.img} />
        </div>

        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="query" ref={this.setTextInputRef} />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
