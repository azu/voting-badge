# voting-badge

Simple backend for voting badge.

## Usage

[![Vote](http://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](http://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)

```markdown
[![Vote](http://voting-badge.herokuapp.com/img?url=https://github.com/azu/voting-badge)](http://voting-badge.herokuapp.com/vote?url=https://github.com/azu/voting-badge)
```

### API

#### Get badge img

```
http://voting-badge.herokuapp.com/img?url={URL}
```

`{URL}` : string as key

Return badge image url which is used http://shields.io/ 

##### NOTE

GitHub aggressive image caching.

#### Get number of votes

```
http://voting-badge.herokuapp.com/count?url={URL}
```

`{URL}` : string as key

Return number of votes.

#### Vote

```
http://voting-badge.herokuapp.com/vote?url={URL}
```

`{URL}` : string as key

Vote to `{URL}` - :+1:


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT