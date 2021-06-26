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

import {
  Footer,
  CwdContainer,
  GitContainer,
  ItemBranch,
  ItemDirty,
  ItemAhead,
} from './styles';

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
    const { statusLineConfig } = this.props;
    const { dirty, ahead, cwd, remote, branch } = this.state;

    const dirtyTitle = `${dirty} dirty ${dirty > 1 ? 'files' : 'file'}`;
    const aheadTitle = `${ahead} ${ahead > 1 ? 'commits' : 'commit'} ahead`;

    return (
      <Footer
        fontFamily={statusLineConfig.fontFamily}
        isTransparent={statusLineConfig.isTransparent}
        backgroundColor={statusLineConfig.background}
        isLinux={statusLineConfig.platform === 'linux'}
      >
        <CwdContainer
          hoverColor={statusLineConfig.cwdHoverColor}
          foregroundColor={statusLineConfig.foreground}
        >
          <div>
            <div title={cwd} hidden={!cwd} onClick={this.handleCwdClick}>
              {cwd ? tildify(String(cwd)) : ''}
            </div>
          </div>
        </CwdContainer>
        <GitContainer foregroundColor={statusLineConfig.foreground}>
          <ItemBranch
            title={remote}
            hidden={!branch}
            isClickable={!!remote}
            onClick={this.handleBranchClick}
            hoverColor={statusLineConfig.branchHoverColor}
            foregroundColor={statusLineConfig.foreground}
          >
            {branch}
          </ItemBranch>
          <ItemDirty
            hidden={!dirty}
            title={dirtyTitle}
            color={statusLineConfig.dirtyColor}
          >
            {dirty}
          </ItemDirty>
          <ItemAhead
            hidden={!ahead}
            title={aheadTitle}
            color={statusLineConfig.aheadColor}
          >
            {ahead}
          </ItemAhead>
        </GitContainer>
      </Footer>
    );
  }
}
