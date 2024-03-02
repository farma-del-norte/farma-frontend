import React, {Component} from 'react'
import { LOGIN_LOCALE } from 'src/utils/constants'
import {connect, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {Modal} from '@mui/material'
import {formStyle, inputStyle, buttonStyle, modalContentStyle} from './styles'
import { showInputPasswords, setInputPasswords } from 'src/store/users/reducer'
import { default as PasswordInputs } from './inputPasswords'
import Button from '@mui/material/Button'

const handleVerifyCode = () => {
  console.log(Number(code.join('')))
}

const mapstatetoprops = (state) => ({
  showInputPasswords: state.users.showInputPasswords
})


class VerifyCodeModal extends Component {
  constructor(props) {
    super(props)
    this.nameInput = React.createRef()
    this.open = this.props.open
    this.handleClose = this.props.handleClose.bind(this)
    this.state = {
      name: '',
      code: new Array(5).fill(0)
    }
  }

  onShowInputPasswords = () => {
    this.props.setInputPasswords(true);
  }

  handleForm = () => {
    let inputIndex = parseInt(window.event.target.dataset.index),
      number = window.event.target.value,
      currentIndexInput = inputIndex
    this.state.code[inputIndex] = number

    if (inputIndex >= 0 && inputIndex <= 3 && number !== '') {
      currentIndexInput = inputIndex += 1
    } else if ((inputIndex === 4 && number !== '') || (inputIndex === 0 && number === '')) {
      currentIndexInput = inputIndex
    } else {
      currentIndexInput = inputIndex -= 1
    }

    let element = document.getElementById(currentIndexInput)

    if (element) {
      element.focus()
    }
  }

  render() {
    return (
      <Modal open={this.open} onClose={this.handleClose}>
        <div style={modalContentStyle}>
          { !this.props.showInputPasswords &&
            <div className='inputs--container'>
            <h2 class='heading-secondary margin-bottom-m'>{LOGIN_LOCALE.ENTER_CODE}</h2>
            <p class='margin-bottom-s'>{LOGIN_LOCALE.ENTER_CODE_RECOVERY_PASSWORD} </p>
            <form class='form--verifiy-code' style={formStyle}>
              {this.state.code.map((item, idx) => {
                return (
                  <input
                    key={idx}
                    id={idx}
                    name={'input' + idx}
                    ref={this.nameInput}
                    class='input input--single-char'
                    placeholder='0'
                    size='1'
                    maxlength='1'
                    style={inputStyle}
                    onChange={e => {
                      this.handleForm.call(this, e)
                    }}
                    data-index={idx}
                  />
                )
              })}
              <Button style={buttonStyle} onClick={this.onShowInputPasswords}>&rarr;</Button>
            </form>
            </div>
          }
          {
            this.props.showInputPasswords && (
              <PasswordInputs/>
            )
          }
        </div>
      </Modal>
    )
  }
}

const mapdispatchtoprops = (dispatch) => {
  return {
    setInputPasswords: (value) => dispatch(setInputPasswords(value))
  }
};

export default connect(mapstatetoprops, mapdispatchtoprops)(VerifyCodeModal)