/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'ne-rc'
import { hideToast, hideLoading } from '../store/actions/ui.js'

class App extends React.Component {
  onToastClose = () => {
    this.props.hideToast()
  }

  render() {
    const {toast} = this.props
    return (
      <div className='app_container'>
        <Toast {...toast} onClose={this.onToastClose} />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toast: state.ui.toast
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideToast: () => {
      dispatch(hideToast())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
