FROM ruby:2.5-alpine

RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

RUN apk add --update --virtual runtime-deps nodejs libffi-dev readline sqlite sqlite-dev

RUN apk add --update --virtual build-deps build-base libc-dev linux-headers libxml2-dev libxslt-dev readline-dev

WORKDIR /tmp
ADD /Gemfile* ./

RUN bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java && \
    bundle install --jobs=4

ENV APP_HOME /backend
COPY / $APP_HOME
WORKDIR $APP_HOME
