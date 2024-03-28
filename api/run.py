from zephyr import app, __version__, __author__

print("Zephyr API Version - ", __version__)
print("API developed by - ", __author__)

#running in debug for instant updates
#automatically on port 5000
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")