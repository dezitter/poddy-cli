# poddy

> Interactive command line podcast manager.

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

First you'll need to launch poddy.

```shell
$ ./bin/poddy
poddy>
```

### help

Show basic usage information:

```shell
poddy> help
```

### add name url

Add a new podcast by providing a name and a feed:

```shell
poddy> add TimFerris http://feeds.feedburner.com/thetimferrissshow
```

### list [name] [-c/--count X]

List your podcasts:

```shell
poddy> list
```

List a single podcast:

```shell
poddy> list TimFerris
```

Specify the number of episodes to show:

```shell
poddy> list TimFerris --count 5
```

Show all episodes:

```shell
poddy> list TimFerris --all
```

Show podcat names only:

```shell
poddy> list --name-only
```

### update [name]

Update all your podcasts to retrieve new episodes if any:

```shell
poddy> update
```

Update a single podcast:

```shell
poddy> update TimFerris
```

### search text

Performs a **local** search, i.e you need to run `update` first (see above).


```shell
poddy> search "javascript"
```

### download name numbers

Download podcast episodes:

```shell
poddy> download TimFerris 1
```

```shell
poddy> download TimFerris 1,2
```

```shell
poddy> download TimFerris 1-5
```

```shell
poddy> download TimFerris 0,1,5-9,12
```

### remove name

Remove a podcast:

```shell
poddy> remove TimFerris
```

## License

MIT
