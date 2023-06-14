Simple Masonry Layout For Static Site
=====================================

Very simple (yet responsive) implementation of masonry layout, aimed for use on mostly static sites. It splits child elements of container element to separate divs for future css styling. 

How to
------

### HTML & Java Script

You must have layout container, and a bunch of child elements inside it like this:

```
<div class=".myMasonry">
  <div class="item"> ... </div>
  <div class="item"> ... </div>
  <div class="item"> ... </div>
  <div class="item"> ... </div>
  ...
</div>

```

Include JS somewhere, than call init function like this:

```
  <script src="<path to>/masonry.js"></script>
  <script>
     window.masonry.init( {
        container: ".myMasonry",
        countFn: ()=>{ return window.innerWidth > 800 ? 4 : 2 }
    } )
    
  </script>

```
Init function parameter is an object with fields:

| name | value | note |
|--|--|--|
| container | CSS selector of container node | required! |
| children | CSS selector for masonry items | if not present, will be a concatenation of previous value and `> *` - usually works fine |
| countFn | function, which will get a container node as argument, and return the number of columns | not required, if not present, some default value will be used |
| columnClass | class name for generated column elements | default = `col` | 

### CSS

After iniitialisation it will add `masonryWatched` class to your container node. It facilitates the creation of fallback styles (see exanple). You can have regular columns of flex for users without JS, and remove fallback rules for others.

