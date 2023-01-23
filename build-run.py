import os
print("---------- Building the build folder --")
os.system('cmd /c "npx tsc -p build"')
print("---------- Build Complete :) ----------")
print("---------- Running server.js ----------")
os.system('cmd /c "node ./bin/server.js"')
