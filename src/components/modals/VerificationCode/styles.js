const formStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '0.8rem'
}

const inputStyle = {
  size: '1',
  border: 'none',
  backgroundColor: '#eee',
  textAlign: 'center',
  borderRadius: '11px',
  padding: '12px',
  caretColor: 'transparent !important'
}

const buttonStyle = {
  padding: ' 12px',
  backgroundColor: '#0070f0',
  borderRadius: '11px',
  color: 'white',
  transition: 'all 0.3s',
  border: 'none',
  cursor: 'pointer'
}

const modalContentStyle = {
    display: 'inline-block',
    padding: '1.2rem 2.6rem',
    borderRadius: '9px',
    boxShadow: '0.8rem 1.2rem 3.2rem rgba(0, 0, 0, 0.3)',
    backgroundColor: '#0d1625',
    color: 'rgb(239, 239, 239)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

module.exports = {
    formStyle,
    inputStyle,
    buttonStyle,
    modalContentStyle
}
