`sort()` in Nunjucks is a version of jinja's sort, it takes three parameters:

```njk
sort(reverse, case_sensitive, attribute)
```

- `reverse` (boolean) sorts descending instead of ascending
- `case_sensitive` (boolean) will sort upper and lower case strings separately
- `attribute` (string) the attribute to sort the object by

In my `index.njk` layout I am sorting collections like so:

```njk
collections.post | sort(true, true, 'date')
```
