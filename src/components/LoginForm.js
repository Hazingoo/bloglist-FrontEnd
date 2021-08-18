import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '30px 120px',
  },
})

const LoginForm = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <form onSubmit={props.handleLogin}>
        <div>
          <TextField name='username' label='username' />
        </div>
        <div>
          <TextField name='password' label='password' type='password' />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
