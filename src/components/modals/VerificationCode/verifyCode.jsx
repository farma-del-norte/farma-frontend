import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal} from '@mui/material'
import {formStyle, inputStyle, buttonStyle, modalContentStyle} from './styles'
import {setInputPasswords} from 'src/store/users/reducer'
import {validateVerificationCode} from 'src/store/users/actions'
import {default as PasswordInputs} from './inputPasswords'
import { t } from 'i18next'
import FallbackSpinner from 'src/@core/components/spinner'
import Button from '@mui/material/Button'

const mapstatetoprops = state => ({
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
      name: t('Empty_string'),
      code: new Array(6).fill(0)
    }
  }

  onShowInputPasswords = async () => {
    this.setState({
      showLoading : true
    });
    let body = {
        email: this.email,
        code: Number(this.state.code.join(t('Empty_string')))
      },
      response = await this.props.validateVerificationCode(body),
      payload = response.payload

    if (payload === t('Error_code')) {
      this.setState({ showLoading: false })
      return
    } else {
      let hasFolio = payload.folio ? true : false,
        message = payload.message

      if (hasFolio && message.includes(t('Valid_code'))) {
        this.setState({showLoading: false})
        this.props.setInputPasswords(true)
      }
      this.setState({ showLoading: false })
    }
  }

  handleForm = () => {
    let inputIndex = parseInt(window.event.target.dataset.index),
      number = window.event.target.value,
      currentIndexInput = inputIndex

    const updatedCode = [...this.state.code]
    updatedCode[inputIndex] = number
    this.setState({code: updatedCode})

    if (inputIndex >= 0 && inputIndex <= 4 && number !== t('Empty_string')) {
      currentIndexInput = inputIndex += 1
    } else if (
      (inputIndex === 5 && number !== t('Empty_string')) ||
      (inputIndex === 0 && number === t('Empty_string'))
    ) {
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
          {!this.props.showInputPasswords && (
            <div className='inputs--container'>
              <h2 className='heading-secondary margin-bottom-m'>{t('Enter_code')}</h2>
              <p className='margin-bottom-s'>{t("Enter_code_recovery_password")} </p>
              <form className='form--verifiy-code' style={formStyle}>
                {this.state.code.map((item, idx) => {
                  return (
                    <input
                      key={idx}
                      id={idx}
                      name={'input' + idx}
                      ref={this.nameInput}
                      className='input input--single-char'
                      placeholder='0'
                      size='1'
                      maxLength='1'
                      style={inputStyle}
                      onChange={e => {
                        this.handleForm.call(this, e)
                      }}
                      onKeyPress={event => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                      data-index={idx}
                    />
                  )
                })}
                <Button style={buttonStyle} onClick={this.onShowInputPasswords}>
                  &rarr;
                </Button>
              </form>
            </div>
          )}
          { this.state.showLoading ? <FallbackSpinner /> : (
            this.props.showInputPasswords && <PasswordInputs email={this.email} openModal={this.props.showInputPasswords} onClose={this.handleClose} code={Number(this.state.code.join(t('Empty_string')))} />
          )}
        </div>
      </Modal>
    )
  }
}

const mapdispatchtoprops = dispatch => {
  return {
    setInputPasswords: value => dispatch(setInputPasswords(value)),
    validateVerificationCode: body => dispatch(validateVerificationCode(body))
  }
}

export default connect(mapstatetoprops, mapdispatchtoprops)(VerifyCodeModal)
