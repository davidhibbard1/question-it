import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

class ExploreTabs extends React.Component {

  static defaultProps = {
    tab: '',
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }

  switchTabs = (tab) => {
    this.context.router.push(`/explore/${tab}`);
  }

  render() {
    let tab = this.props.params.tab;
    return (
      <Tabs value={tab} onChange={this.switchTabs}>
        <Tab label="trending" value="trending" />
        <Tab label="top" value="top" />
        <Tab label="recent" value="recent" />
      </Tabs>
    );
  }
}

ExploreTabs.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ExploreTabs;
