import React, { Component } from 'react'
import Aux from './../Aux/Aux'
import Modal from './../../components/UI/Modal/Modal'

const errorHandler = (WrapperComponent, axios) => {

    return class extends Component {
        state = {
            error: false
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: false })
                return req
            })
            axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            })
        }

        errorPopUpHandler = () => {
            this.setState({ error: false })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error ? true : false}
                        closeModal={this.errorPopUpHandler}>
                        {this.state.error ? this.state.error.message : null}</Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }


}

export default errorHandler