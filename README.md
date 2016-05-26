A time-tracker app build on Google App Engine, build on example at https://github.com/jonparrott/Ferris-3-Example.git.

This project consists of a two pieces:
1. The *backend* powered by Ferris 3 and Google Cloud Endpoints.
2. The *frontend* written in HTML and JS using the Google Javascript Client Library.

## Getting started

1. Clone this repository:

    ```
    git clone git@github.com:afzalSH/time-tracker.git
    cd time-tracker
    ```

2. Install dependencies for the backend using pip:

    ```
    cd backend
    pip install --pre -t lib -r requirements.txt
    ```

## Running locally

1. Run the backend locally from the command line. You will need the [App Engine Python SDK](https://developers.google.com/appengine/downloads):

    ```
    dev_appserver.py backend
    ```

2. If you want, visit the backend's API explorer [http://localhost:8080/_ah/api/explorer](http://localhost:8080/_ah/api/explorer)


3. Run the frontend on a different port with a different storage path.

    ```
    dev_appserver.py --port 8081 --admin_port 8001 --storage_path /tmp/frontend frontend
    ```

4. Visit the frontend at [http://localhost:8081](http://localhost:8081).
