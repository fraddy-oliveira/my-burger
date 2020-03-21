import React, { Component } from 'react';
import Aux from './../Aux/Aux';
import Modal from './../../components/UI/Modal/Modal';

const errorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: false,
    };
    reqInterceptors = null;
    resInterceptors = null;

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: false });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(null, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorPopUpHandler = () => {
      this.setState({ error: false });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error ? true : false}
            closeModal={this.errorPopUpHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
