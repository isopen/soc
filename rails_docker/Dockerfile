FROM ruby:2.3-alpine

RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

RUN apk add --update --virtual runtime-deps nodejs libffi-dev readline sqlite sqlite-dev

WORKDIR /tmp
ADD ../backend/Gemfile* ./

RUN apk add --virtual build-deps build-base openssl-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    bundle install --jobs=2 && \
    apk del build-deps

ENV APP_HOME ../backend
COPY . $APP_HOME
WORKDIR $APP_HOME

ENV RAILS_ENV=production \
    RACK_ENV=production
