import React from 'react'
import TextField from '@material-ui/core/TextField'

class Signup extends React.Component{

	constructor(props){
		super(props)
	}
	render() {
    return (
    	<div className={this.props.className}>
    		<TextField
	          name="name"
	          label="User Name"
	          error={this.props.error['name']}
            helperText={this.props.error['name']}
	          type="text"
	          onChange={this.props.handleChange('name')}
	          value={this.props.name}
	          autoComplete="current-name"
	          margin="normal"
	          autoFocus
	          fullWidth
	        />
	        <TextField
	          name="phone"
	          label="Phone Number"
	          error={this.props.error['phone']}
            helperText={this.props.error['phone']}
	          type="tel"
	          onChange={this.props.handleChange('phone')}
	          value={this.props.phone}
	          autoComplete="current-phone"
	          margin="normal"
	          fullWidth
	        />
	        <TextField
	          name="email"
	          label="Email ID"
	          error={this.props.error['email']}
           	helperText={this.props.error['email']}
	          type="email"
	          onChange={this.props.handleChange('email')}
	          value={this.props.email}
	          autoComplete="current-email"
	          margin="normal"
	          fullWidth
	        />
	        <TextField
	          name="password"
	          label="Password"
	          error={this.props.error['password']}
            helperText={this.props.error['password']}
	          type="password"
	          onChange={this.props.handleChange('password')}
	          value={this.props.password}
	          autoComplete="current-password"
	          margin="normal"
	          fullWidth
	        />
		</div>
    )
	}
}

export default Signup