# voting-badge 

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Simple backend for voting badge.

Create Badge at [Here](http://azu.github.io/voting-badge/ ":1: Voting Badge")

## Usage

[![Vote](https://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](https://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)

```markdown
[![Vote](https://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](https://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)
```

### API

#### Get badge img

```
https://voting-badge.herokuapp.com/img?url={URL}&style={STYLE}&label={LABEL}&color={COLOR}
```

`{URL}` : string as key

`{STYLE}` *(optionnal)* : string as [style](https://shields.io/#styles) (default : `flat`)

`{LABEL}` *(optionnal)* : string as label (default : `Vote++`)

`{COLOR}` *(optionnal)* : string as [color](https://shields.io/#colors) (default : `green`)

Return badge image url which is used http://shields.io/ 

##### NOTE

GitHub aggressive image caching.

#### Get number of votes

```
https://voting-badge.herokuapp.com/count?url={URL}
```

`{URL}` : string as key

Return number of votes.

#### Vote

```
https://voting-badge.herokuapp.com/vote?url={URL}
```

`{URL}` : string as key

Vote to `{URL}` - :+1:


## Installation

Previously, Install dependency.

* Install cario. For system-specific installation view the [Automattic/node-canvas Wiki](https://github.com/Automattic/node-canvas/wiki/_pages "Pages · Automattic/node-canvas Wiki").
* Install [Redis](http://redis.io/download "Download – Redis")

``` sh
npm install
```

### Develop

```sh
redis-server # launch redis-server
npm start
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
