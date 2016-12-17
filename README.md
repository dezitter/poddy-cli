# poddy

> Command line podcast manager.

## Install

```shell
git clone https://github.com/dezitter/poddy
cd poddy/
npm install
```

## Build

If you need to, customize the `env.example` file before running the command.

```shell
npm run build
```

## Usage

### help

Show basic usage information:

```shell
./bin/poddy help
```

### add name url

Add a new podcast by providing a name and a feed:

```shell
./bin/poddy add TimFerris http://feeds.feedburner.com/thetimferrissshow
```

### list [name] [--limit=NUMBER]

List your podcasts:

```shell
./bin/poddy list
```

List a single podcast:

```shell
./bin/poddy list TimFerris
```

Limit the number of episodes to show:

```shell
./bin/poddy list TimFerris --limit=50
```

### update [name]

Update all your podcasts to retrieve new episodes if any:

```shell
./bin/poddy update
```

Update a single podcast:

```shell
./bin/poddy update TimFerris
```

### search text

Performs a **local** search, i.e you need to run `update` first (see above).


```shell
./bin/poddy search "javascript"
```

### download name numbers

Download podcast episodes:

```shell
./bin/poddy download TimFerris 1
./bin/poddy download TimFerris 1,2
./bin/poddy download TimFerris 1-5
./bin/poddy download TimFerris 0,1,5-9,12
```

### remove name

Remove a podcast:

```shell
./bin/poddy remove TimFerris
```

## License

MIT
