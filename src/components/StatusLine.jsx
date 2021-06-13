import React, { Component } from 'react';
import { shell } from 'electron';
import tildify from 'tildify';

import { getCwd } from '../utils/getCwd';
import { getGit } from '../utils/git';

import { gitDefault } from '../config/gitDefault';

let updateState = () => {};

let globalPid;

async function setCwd({ pid, action }) {
  const cwd = await getCwd(pid, action);
  const git = await getGit(cwd);

  updateState({ cwd, git });
}

export const HyperMiddleware = store => next => action => {
  const uids = store.getState().sessions.sessions;

  switch (action.type) {
    case 'SESSION_SET_XTERM_TITLE': {
      globalPid = uids[action.uid].pid;
      break;
    }
    case 'SESSION_ADD': {
      globalPid = action.pid;
      setCwd({ pid: globalPid });
      break;
    }
    case 'SESSION_ADD_DATA': {
      const { data } = action;
      const enterKey = data.indexOf('\n') > 0;
      if (enterKey) setCwd({ pid: globalPid, action });
      break;
    }
    case 'SESSION_SET_ACTIVE': {
      globalPid = uids[action.uid].pid;
      setCwd({ pid: globalPid });
      break;
    }
  }

  next(action);
};

export class StatusLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cwd: '',
      branch: gitDefault.branch,
      remote: gitDefault.remote,
      dirty: gitDefault.dirty,
      ahead: gitDefault.ahead,
    };

    this.handleCwdClick = this.handleCwdClick.bind(this);
    this.handleBranchClick = this.handleBranchClick.bind(this);
  }

  handleCwdClick(event) {
    shell.openExternal('file://' + this.state.cwd);
  }

  handleBranchClick(event) {
    shell.openExternal(this.state.remote);
  }

  componentDidMount() {
    updateState = ({ cwd, git }) => {
      this.setState({
        cwd: cwd,
        branch: git.branch,
        remote: git.remote,
        dirty: git.dirty,
        ahead: git.ahead,
      });
    };
  }

  componentWillUnmount() {
    updateState = undefined;
  }

  render() {
    return (
      <footer className="footer_footer">
        <div className="footer_group group_overflow">
          <div className="component_component component_cwd">
            <div
              className="component_item item_icon item_cwd item_clickable"
              title={this.state.cwd}
              onClick={this.handleCwdClick}
              hidden={!this.state.cwd}
            >
              {this.state.cwd ? tildify(String(this.state.cwd)) : ''}
            </div>
          </div>
        </div>
        <div className="footer_group">
          <div className="component_component component_git">
            <div
              className={`component_item item_icon item_branch ${
                this.state.remote ? 'item_clickable' : ''
              }`}
              title={this.state.remote}
              onClick={this.handleBranchClick}
              hidden={!this.state.branch}
            >
              {this.state.branch}
            </div>
            <div
              className="component_item item_icon item_number item_dirty"
              title={`${this.state.dirty} dirty ${
                this.state.dirty > 1 ? 'files' : 'file'
              }`}
              hidden={!this.state.dirty}
            >
              {this.state.dirty}
            </div>
            <div
              className="component_item item_icon item_number item_ahead"
              title={`${this.state.ahead} ${
                this.state.ahead > 1 ? 'commits' : 'commit'
              } ahead`}
              hidden={!this.state.ahead}
            >
              {this.state.ahead}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
