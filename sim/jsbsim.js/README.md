[![NPM](https://nodei.co/npm/jsbsim.js.png?downloads=true&stars=true)](https://nodei.co/npm/jsbsim.js/)

[JSBSim](http://jsbsim.sourceforge.net/index.html) flight dynamics model ported to JavaScript using emscripten

Installation
-------------
    $ npm install -g jsbsim.js


Building
---------
    $ npm run build

Usage 
------

####node.js

    $ jsbsim.js [script file name] [output file names] <options>

###

Options
--------

    --help  returns this message
    --version  returns the version number
    --outputlogfile=<filename>  sets (overrides) the name of a data output file
    --logdirectivefile=<filename>  specifies the name of a data logging directives file
                                   (can appear multiple times)
    --root=<path>  specifies the JSBSim root directory (where aircraft/, engine/, etc. reside)
    --aircraft=<filename>  specifies the name of the aircraft to be modeled
    --script=<filename>  specifies a script to run
    --realtime  specifies to run in actual real world time
    --nice  specifies to run at lower CPU usage
    --nohighlight  specifies that console output should be pure text only (no color)
    --suspend  specifies to suspend the simulation after initialization
    --initfile=<filename>  specifies an initilization file
    --catalog specifies that all properties for this aircraft model should be printed
              (catalog=aircraftname is an optional format)
    --property=<name=value> e.g. --property=simulation/integrator/rate/rotational=1
    --simulation-rate=<rate (double)> specifies the sim dT time or frequency
                      If rate specified is less than 1, it is interpreted as
                      a time step size, otherwise it is assumed to be a rate in Hertz.
    --end=<time (double)> specifies the sim end time

    NOTE: There can be no spaces around the = sign when
          an option is followed by a filename


Running Tests
--------------
Install the development dependencies:

    $ npm install

Then run the tests:

    $ npm test


Upstream Version
-----------------

JSBSim Version: 1.0


## License

GNU LESSER GENERAL PUBLIC LICENSE
Version 2.1, February 1999
