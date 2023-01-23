import os
print("---------- Building the build folder ----------")
os.system('cmd /c "npx tsc -p build')
print("---------- Build Complete----------")