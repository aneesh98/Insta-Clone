#!/bin/bash

source "/var/app/venv/staging-LQM1lest/bin/activate" && {
    if [[ $EB_IS_COMMAND_LEADER == "true" ]];
    then
        # log which migrations have already been applied
        python manage.py showmigrations;
        # migrate
        python manage.py migrate --noinput;
        python manage.py collectstatic --noinput;
	~/replace_static_file.sh;
    else
        echo "this instance is NOT the leader";
    fi
}
