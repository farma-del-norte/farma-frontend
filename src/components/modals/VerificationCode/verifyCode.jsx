import React, { Component } from 'react'
import { LOGIN_LOCALE } from 'src/utils/constants'
import { connect } from 'react-redux'
import { Modal } from '@mui/material'
import { formStyle, inputStyle, buttonStyle, modalContentStyle } from './styles'
import { setInputPasswords } from 'src/store/users/reducer'
import { validateVerificationCode } from 'src/store/users/actions'
import { default as PasswordInputs } from './inputPasswords'
import Button from '@mui/material/Button'

const mapstatetoprops = (state) => ({
  showInputPasswords: state.users.showInputPasswords
})

class VerifyCodeModal extends Component {
  constructor(props) {
    super(props)
    this.nameInput = React.createRef()
    this.open = this.props.open
    this.email = this.props.email
    this.handleClose = this.props.handleClose.bind(this)
    this.state = {
      name: LOGIN_LOCALE.EMPTY_STRING,
      code: new Array(6).fill(0)
    }
  }

  onShowInputPasswords = async () => {
    let body = {
      email: this.email,
      code: Number(this.state.code.join(LOGIN_LOCALE.EMPTY_STRING))
    },
    response = await this.props.validateVerificationCode(body),
    payload = response.payload;

    if(payload === LOGIN_LOCALE.ERROR_CODE) {
      return
    } else {
      let hasFolio = payload.folio ? true : false,
        message = payload.message;

        if(hasFolio && message.includes(LOGIN_LOCALE.VALID_CODE)) {
          this.props.setInputPasswords(true);
        }
    }
  }

  handleForm = () => {
    let inputIndex = parseInt(window.event.target.dataset.index),
      number = window.event.target.value,
      currentIndexInput = inputIndex
    this.state.code[inputIndex] = number

    if (inputIndex >= 0 && inputIndex <= 4 && number !== LOGIN_LOCALE.EMPTY_STRING) {
      currentIndexInput = inputIndex += 1
    } else if ((inputIndex === 5 && number !== LOGIN_LOCALE.EMPTY_STRING) || (inputIndex === 0 && number === LOGIN_LOCALE.EMPTY_STRING)) {
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
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
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
              <PasswordInputs email={this.email} code={Number(this.state.code.join(LOGIN_LOCALE.EMPTY_STRING))}  />
            )
          }
        </div>
      </Modal>
    )
  }
}

const mapdispatchtoprops = (dispatch) => {
  return {
    setInputPasswords: (value) => dispatch(setInputPasswords(value)),
    validateVerificationCode: (body) => dispatch(validateVerificationCode(body))
  }
};

export default connect(mapstatetoprops, mapdispatchtoprops)(VerifyCodeModal)