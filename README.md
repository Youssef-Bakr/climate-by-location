# Climate Widget (Climate in Your Location) Graph Library

This library defines functions that create and manage interactive climate
widget graphs.

## Prerequisite

This library depends on jQuery. You should make sure that a copy of jQuery has
been loaded in your page before including the `<script>` tag below.

## Installation

To use this library, include the following script tag in your HTML file (after
loading jQuery):

```html
<script src="climate-widget-graph.js"></script>
```

The file `climate-widget-graph.js` is included in this project, in the top-level
directory, and is the only file that is needed for deployment; all other files
in this directory are only used in development, or for examples or documentation.

## Usage

The file `climate-widget-graph.js` defines the single global name "climate_widget"
which has the following function properties:

### `climate_widget.graph(OPTIONS)`

This function creates a graph according to `OPTIONS`, which should be an object with some or
all of the following properties:

  * `div`
    a string which is a CSS-style selector identifying a div
    where the graph should be drawn; this div must already
    be layed out and sized by the browser --- the graph will
    exactly fill the div. Required.

  * `dataprefix`
    A URL from which the data can be downloaded.  Required.

  * `fips`
    A 5-character fips code of a US county, as a string.  Required.

  * `variable` 
    The id of the variable to display; see climate_widget.variables()
    below for a way to get a list of variable ids.  Optional; defaults
    to "tasmax".

  * `frequency` 
    One of the strings "annual", "monthly", or "seasonal", indicating which
    type of data to display.  Optional; defaults to "annual".

  * `scenario` 
    One of the strings "rcp45", "rcp85", or "both", indicating which
   scenario(s) to display for projection data.  Optional; defaults to "both".

  * `presentation` 
    One of the strings "absolute" or "anomaly", indicating which
    presentation should be used in setting the graph's y axis scale.   Only
    relevant for annual data; ignored for monthly or seasonal. Optional;
    defaults to "absolute".

  * `timeperiod` 
    One of the strings "2025", "2050", or "2075" (strings not numbers!),
    indicating which 30-year period of projection data to show for
    monthly or seasonal data.  Ignored for annual data.  Optional;
    defaults to "2025".

  * `font` 
    A string giving the font-family to be used for all text in the graph.
    Optional; defaults to the browser's default canvas font (depends on
    the browser).

The `climate_widget.graph()` function returns an object which
represents the graph just created.  This object has a single property
named `update` which is a function that can be used to modify the
graph.  The `update()` function takes an OPTIONS object with exactly
the same properities described above for `climate_widget.graph()`, and
has the effect of updating the graph according to the new values.


### `climate_widget.variables(FREQUENCY)`

The function `climate_widget.variables(FREQUENCY)` will return an
array giving the ids and the titles of all the climate variables for
the given frequency; FREQUENCY should be one of the strings "annual",
"monthly", or "seasonal".

## Examples

The following will create a graph in the div with id "widget", showing
annual average daily minimum temperature for Buncombe county NC, showing
the rcp85 scenario for the projection data:

```javascript
var cwg = climate_widget.graph({
    div        : "div#widget",
    dataprefix : "http://climate-widget-data.nemac.org/data",
    font       : "Roboto",
    frequency  : "annual",
    fips       : "37021",
    variable   : "tasmin",
    scenario   : "rcp85"
});
```

The following will modify the above graph to show both the rcp45 and rcp85
scenarios:

```javascript
cwg.update{
    scenario : "both"
});
```

The following will modify the above graph to show annual average daily precipitation:

```javascript
cwg.update{
    variable : "pr"
});
```

For a more complete example, see the files `demo.html` and `demo.js` in this
directory.
