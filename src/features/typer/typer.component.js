import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./typer.css";

import { isTypingFinished, selectTyping } from "../joke/joke.slice";

const TYPING_SPEED = 80;
const DELETING_SPEED = 10;

class Typer extends React.Component {
  constructor(props) {
    super();
  }
  state = {
    text: "",
    isDeleting: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED,
  };

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const {
      dataText = ["Something isn't right ..."],
      isTypingFinished,
      typing,
    } = this.props;

    const { isDeleting, text, typingSpeed } = this.state;
    const i = dataText.length - 1;
    const fullText = dataText[i];

    this.setState({
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED,
    });

    if (!isDeleting && text === fullText && typing) {
      isTypingFinished();
    }

    // if (!isDeleting && text === fullText) {
    //   setTimeout(() => this.setState({ isDeleting: true }), 500);
    // } else
    // if (isDeleting && text === "") {
    //   this.setState({
    //     isDeleting: false,
    //   });
    // }

    setTimeout(this.handleType, typingSpeed);
  };

  render() {
    return (
      <div>
        <p className="typing-text">
          {this.state.text}
          <span id="cursor"></span>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isTypingFinished: () => dispatch(isTypingFinished()),
  };
};

const mapStateToProps = createStructuredSelector({
  typing: selectTyping,
});

export default connect(mapStateToProps, mapDispatchToProps)(Typer);
