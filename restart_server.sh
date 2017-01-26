until node server.js; do
    echo "Node Js server crashed with exit code $?.  Respawning.." >&2
    sleep 1
done
