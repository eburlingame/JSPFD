#!/bin/sh
basedir=`dirname "$0"`

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../jsbsim.js/bin/jsbsim-cli" "$@"
  ret=$?
else 
  node  "$basedir/../jsbsim.js/bin/jsbsim-cli" "$@"
  ret=$?
fi
exit $ret
