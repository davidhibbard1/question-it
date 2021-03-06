import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import NavButtons from '../navButtons';

import s from './AppToolbar.css';

const styles = {
  toolbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
};

class AppToolbar extends React.Component {

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    flexibleSpaceElement: React.PropTypes.element,
    tabsElement: React.PropTypes.element,
    zDepth: React.PropTypes.number,
    logoUrl: React.PropTypes.string,
    onLogoClick: React.PropTypes.func,
  }

  static defaultProps = {
    title: '',
    zDepth: 1,
  }

  constructor() {
    super();
    this.state = {};
    this.listener = this.handleScroll;
  }
	
  componentWillMount() {
    const parent = this.context.muiTheme;
    this.muiTheme = getMuiTheme(parent, {
      toolbar: {
        height: parent.appBar.height,
        backgroundColor: parent.appBar.color,
      },
      zIndex: {
        toolbar: parent.zIndex.appBar,
      },
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listener);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ doDepth: nextProps.flexibleSpaceElement === null });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener);
  }

  handleScroll = () => {
    const height = document.getElementById('calcHeight').clientHeight;
    const doDepth = window.scrollY > height || !this.props.flexibleSpaceElement;
    this.setState({ doDepth });
  }

  render() {
    const zIndex = this.muiTheme.zIndex.toolbar;
    const { textColor } = this.muiTheme.appBar;
    const { backgroundColor, height } = this.muiTheme.toolbar;

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div
          style={{
            marginBottom: (this.props.tabsElement && this.state.doDepth ?
                           height + 48 :
                           height),
          }}
        >
          <Paper
            id="appBar"
            zDepth={((this.state.doDepth && !this.props.tabsElement) ? this.props.zDepth : 0)}
            style={{
              ...styles.toolbar,
              backgroundColor,
              color: textColor,
              zIndex,
            }}
            className={s.removeShadowTrans}
          >
            <Toolbar>
              <ToolbarGroup
                firstChild
                onClick={this.props.onLogoClick}
                style={{ cursor: (this.props.onLogoClick ? 'pointer' : '') }}
              >
                {
                  this.props.logoUrl ?
                    <img
                      src={this.props.logoUrl}
                      className={s.logo}
                      alt="Question It Logo"
                    />
                  :
                    ''
                }
                <ToolbarTitle
                  text={this.props.title}
                  className={s.title}
                  style={{ color: textColor, fontWeight: 600 }}
                />
              </ToolbarGroup>

              <ToolbarGroup lastChild className={s.navButtons}>
                <NavButtons />
              </ToolbarGroup>

            </Toolbar>
          </Paper>

          <Paper
            id="calcHeight"
            zDepth={this.props.tabsElement ? 0 : this.props.zDepth}
            style={{
              backgroundColor,
              color: textColor,
              position: 'relative',
              top: height,
              zIndex: zIndex - 1,
            }}
            className={s.removeShadowTrans}
          >
            {this.props.flexibleSpaceElement}
          </Paper>

          <Paper
            zDepth={this.props.zDepth}
            style={{
              backgroundColor,
              color: textColor,
              position: (this.state.doDepth ? 'fixed' : 'relative'),
              width: '100%',
              top: height,
              zIndex: zIndex - 2,
            }}
            className={s.removeShadowTrans}
          >
						{this.props.tabsElement}
          </Paper>

        </div>
      </MuiThemeProvider>
			
		);
  }
}


export default withStyles(s)(AppToolbar);
