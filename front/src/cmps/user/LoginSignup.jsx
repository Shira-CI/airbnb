import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { userService } from '../../services/user.service.js'
import { CredentialsForm } from './credentials-form.jsx'
import { useState } from 'react'
import { login, signup } from '../../store/user.action.js'
import { ReserveButton } from '../orders/ReserveButton.jsx'

export function LoginSignup({ onChangeLoginStatus, onCloseModal }) {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const demoCredentials = {
    username: 'ilan',
    password: 'ilan',
    fullname: 'ilan',
  }


  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
  }

  function onSubmit(credentials, isSignUp) {
    isSignUp ? onSignup(credentials) : onLogin(credentials)
  }

  async function onLogin(credentials) {
    if (!credentials.username) return
    try {
      const user = await login(credentials)
      console.log(user)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      onCloseModal()
    } catch (err) {
      showErrorMsg('Cannot login')
    }
    clearState()
  }

  function onSignup(credentials) {
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    signup(credentials)
    clearState()
    onCloseModal()
    console.log('signup')
  }

  return (
    <div className="credentials-page">
      <section className="credentials-header">
        <button onClick={onCloseModal} className="close-login-modal"><i className="fa-solid fa-x fa-xs"></i></button>
        <h3>Log in or sign up </h3>
      </section>
      <CredentialsForm
        onSubmit={onSubmit}
        onCloseModal={onCloseModal}
      />
      <ReserveButton children={'DEMO login'} className="demo-login-btn" onClick={()=> {onLogin(demoCredentials)}}/>
    </div >
  )
}
