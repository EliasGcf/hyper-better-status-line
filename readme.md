# hyper-better-status-line ![GitHub](https://img.shields.io/github/license/EliasGcf/hyper-better-status-line) ![npm](https://img.shields.io/npm/v/hyper-better-status-line)

> Status Line Plugin for [Hyper](https://hyper.is). Shows clickable & useful information. Matches any theme.

![hyper-statusline](https://cloud.githubusercontent.com/assets/1430576/21891665/14d29070-d8d4-11e6-9e98-b12ed28be93a.png)

## Install

Add following to your `~/.hyper.js` config.

```javascript
module.exports = {
  ...
  plugins: ['hyper-better-status-line']
  ...
}
```

## Config

Add following to `~/.hyper.js`

### Change Background Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        background: '#191622',
      }
    ...
  }
}
```

### Change Foreground Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        foreground: '#fff',
      }
    ...
  }
}
```

### Add CWD Hover Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        cwdHoverColor: '#78D1E1',
      }
    ...
  }
}
```

### Add Git Branch Hover Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        branchHoverColor: '#FF79C6',
      }
    ...
  }
}
```

### Add a different Font Family

By default use `.hyper.js` fontFamily

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        fontFamily: 'Fira Code',
      }
    ...
  }
}
```

### Change Git Dirty Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        dirtyColor: 'salmon',
      }
    ...
  }
}
```

### Change Git Ahead Color

Expected value is `CSS color`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        aheadColor: 'ivory',
      }
    ...
  }
}
```

### Disable Footer Transparency

Default value is set to `false`

```javascript
module.exports = {
  config: {
    ...
      hyperStatusLine: {
        isTransparent: true,
      }
    ...
  }
}
```

## Theme

* [hyper-chesterish](https://github.com/henrikdahl/hyper-chesterish)

## License

MIT © Henrik
