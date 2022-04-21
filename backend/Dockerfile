FROM python:3.8-slim

ARG DEV

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PIPENV_HIDE_EMOJIS=true \
    PIPENV_COLORBLIND=true \
    PIPENV_NOSPIN=true \
    PIPENV_DOTENV_LOCATION=.env

RUN apt-get update && apt-get install -y curl python3-dev build-essential && rm -rf /var/lib/apt/lists/*

RUN pip install pipenv

COPY Pipfile* /

RUN pipenv lock --dev --requirements > requirements.txt

# DEV=1 can be passed as args during build (check docker-compose file)
# with --dev, dev pkgs are also installed
RUN echo $([ -n "$DEV" ] && printf %s "Installing pkgs with dev environment")
RUN pipenv install  --deploy --system --ignore-pipfile $([ -n "$DEV" ] && printf %s "--dev")

WORKDIR /app

# always copy files after installing packages
# docker will cache the packages hence better build time
COPY . .

RUN chmod +x scripts/*
