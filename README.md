# 🥧 Tarts

Create tarballs in node or the browser. `Tarts` is a simple function that takes an array of files and returns a tarball as a `Uint8Array`.

### Creating a tarball
```
const tar = Tar([{
  name: 'index.html',
  content: '<!doctype html><h1>Hello world</h1>'
}])
```

### Download tarball in browser
```
const tar = Tar(...)

const a = document.createElement('a')
a.href = URL.createObjectURL(new Blob([tar], { type: 'application/tar' }))
a.download = 'filename.tar'
a.click()
```

### Save to disk in node
```
const tar = Tar(...)
fs.writeFileSync('my.tar', tar)
```
