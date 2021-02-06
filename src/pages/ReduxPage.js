import { Component } from "react";
import store from "../components/store";
export default class ReduxPage extends Component {
  state = {
    inputValue: ''
  }

  componentDidMount() {
    // 订阅
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  add = () => {
    // 派发操作
    store.dispatch({ type: "ADD" });
  };
  minus = () => {
    store.dispatch({ type: "MINUS" });
  };
  asyAdd = () => {
    // 派发操作
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  // inputAdd = () => {
  //   const { inputValue } = this.state;
  //   store.dispatch({ type: "InputADD", payload: inputValue - 0 });
  // }

  // inputMinus = () => {
  //   const { inputValue } = this.state;
  //   store.dispatch({ type: "InputMINUS", payload: inputValue - 0 });
  // }

  render() {
    // const { inputValue } = this.state

    return (
      <div>
        <h3>ReduxPage</h3>
        {/* getState获取数据 */}
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.asyAdd}>asyAdd</button>


        {/* <div>
          <input value={inputValue} onChange={this.changeInput}></input>
        </div>
        <button onClick={this.inputAdd}>inputAdd</button>
        <button onClick={this.inputMinus}>inputMinus</button> */}
      </div>
    );
  }
}
