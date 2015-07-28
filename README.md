# JSPFD

JSPFD is a mockup of an aircraft Primary Flight Display written in Javascript on the HTML5 Canvas. 


## Overview

The display does not simulate the display of any particular aircraft, but rather one that is similar to 
many light aircraft flying today. The project is designed to have modular guages and elements that can be
moved and configured around the panel. 

### Dependencies 

- JQuery 1.11.3 (in repo): For simplier AJAX calls
- chrisveness/geodesy (in repo): For latitude/longitude calculations

### Mockup 

Included in the `/mockup` folder is a vector graphics mockup of the display. The JS implementation is close, but not the 
same as the mockup template. 

## Structure 

### Guages

Guages are individual elements that can be drawn. All of them require the canvas 2D context to be passed in (ctx), and a
location object that includes `width, height, x, y` in pixels.

Currently implemented are:

- Airspeed tape and ticker
- Altitude tape and ticker
- Vertical speed gauge
- Horizontal situation indicator 
- Flight profile display 

### Terrain Data

The terrain data for the profile display is loaded via the USGS's 
[Elevation Point Query Service](http://nationalmap.gov/epqs/) which loads an indidivual elevation given a latitude 
and longitude. 
