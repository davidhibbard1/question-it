import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import customTheme from '../theme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import s from './Root.css';
import grid from './bootstrap-grid/grid.css.less';

class Root extends React.Component {
  constructor(props){
		super();
		this.muiTheme = getMuiTheme(customTheme, { userAgent: props.userAgent });	
	}

  render () {
    return (
			<MuiThemeProvider muiTheme={this.muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
		);
  }
}

let SRoot = withStyles(s)(withStyles(grid)(Root));

class StylesRoot extends React.Component{
	static propTypes = {
    children: PropTypes.element.isRequired,
    onInsertCss: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  }

  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

	render(){
		return (
			<SRoot userAgent={this.props.userAgent}>
				{this.props.children}
			</SRoot>
		);
	}
}


export default StylesRoot;