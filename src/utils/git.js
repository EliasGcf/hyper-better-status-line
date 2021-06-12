const { promiseExec } = require('./promiseExec');

const { gitDefault } = require('../config/gitDefault');

async function isGit(dir) {
  try {
    await promiseExec('git rev-parse --is-inside-work-tree', { cwd: dir });

    return true;
  } catch {
    return false;
  }
}

async function getGitBranch(path) {
  const response = await promiseExec(
    'git symbolic-ref --short HEAD || git rev-parse --short HEAD',
    { cwd: path },
  );

  const branch = response.stdout.trim();

  return branch;
}

async function getGitRemote(path) {
  const response = await promiseExec('git ls-remote --get-url', { cwd: path });

  const remote = response.stdout
    .trim()
    .replace(/^git@(.*?):/, 'https://$1/')
    .replace(/[A-z0-9\-]+@/, '')
    .replace(/\.git$/, '');

  return remote;
}

async function getGitDirty(path) {
  const response = await promiseExec('git status --porcelain --ignore-submodules -uno', {
    cwd: path,
  });

  const dirty = !response.stdout
    ? 0
    : parseInt(response.stdout.trim().split('\n').length, 10);

  return dirty;
}

async function getGitAhead(path) {
  try {
    const response = await promiseExec(
      `git rev-list --left-only --count HEAD...@'{u}' 2>/dev/null`,
      { cwd: path },
    );

    const ahead = parseInt(response.stdout, 10);

    return ahead;
  } catch {
    return parseInt(0, 10);
  }
}

async function gitCheck(path) {
  try {
    const [branch, remote, dirty, ahead] = await Promise.all([
      getGitBranch(path),
      getGitRemote(path),
      getGitDirty(path),
      getGitAhead(path),
    ]);

    return {
      branch,
      remote,
      dirty,
      ahead,
    };
  } catch (err) {
    console.error(err);
  }
}

async function getGit(path) {
  const pathIsGit = await isGit(path);

  if (!pathIsGit) return gitDefault;

  const { branch, remote, dirty, ahead } = await gitCheck(path);

  return {
    branch,
    remote,
    dirty,
    ahead,
  };
}

module.exports = { getGit };
