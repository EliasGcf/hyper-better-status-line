const { promiseExec } = require('./promiseExec');

async function getCwd(pid, action) {
  if (process.platform === 'win32' && action && action.data) {
    let directoryRegex = /([a-zA-Z]:[^\:\[\]\?\"\<\>\|]+)/im;
    let path = directoryRegex.exec(action.data);

    if (path) {
      const cwd = path[0];
      return cwd;
    }
  }

  const response = await promiseExec(
    `lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9-`,
    { env: { ...process.env, LANG: 'en_US.UTF-8' } },
  );

  const cwd = response.stdout.trim();

  return cwd;
}

module.exports = { getCwd };
