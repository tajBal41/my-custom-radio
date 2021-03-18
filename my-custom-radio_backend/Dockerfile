FROM python:3.8.3-alpine
WORKDIR /project
ADD . /project

RUN apk add --no-cache --update \
    python3 python3-dev gcc \
    gfortran musl-dev g++ \
    libffi-dev openssl-dev \
    libxml2 libxml2-dev \
    libxslt libxslt-dev \
    libjpeg-turbo-dev zlib-dev
    
RUN pip install --upgrade cython    
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python","main.py"]