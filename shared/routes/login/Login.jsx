import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LoginForm from '../../components/loginForm';
import LoginSocial from '../../components/loginSocial';
import RegisterForm from '../../components/registerForm';


import s from './Login.css';

class LoginPage extends React.Component{
	render(){
		return (
			<div className={s.root}>
			
				<div className={`row ${s.row}`}>
					
					<div className={`col-xs-12 col-md-7 col-md-push-5 ${s.login}`}>
						<h1 className="center-text">Login</h1>
						<LoginSocial />
						<h2 className="center-text">OR</h2>
						<LoginForm uniqueId="login-page" />
					</div>
					<div className={`col-xs-12 col-md-5 col-md-pull-7 ${s.register}`}>
						<h1 className="center-text">Haven't joined yet?</h1>
						<RegisterForm uniqueId="login-page" />
					</div>
				</div>
			</div>
		);
	}
};

LoginPage.contextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default withStyles(s)(LoginPage);
