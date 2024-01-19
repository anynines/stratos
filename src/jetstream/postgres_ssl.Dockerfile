# This Dockerfile contains the image specification of our database
FROM postgres:15-alpine

COPY ./ssl/postgres.key /var/lib/postgresql
COPY ./ssl/postgres.crt /var/lib/postgresql

COPY ./ssl/testCA.crt /var/lib/postgresql
COPY ./ssl/testCA.crl /var/lib/postgresql

RUN chown 0:70 /var/lib/postgresql/postgres.key && chmod 640 /var/lib/postgresql/postgres.key
RUN chown 0:70 /var/lib/postgresql/postgres.crt && chmod 640 /var/lib/postgresql/postgres.crt

RUN chown 0:70 /var/lib/postgresql/testCA.crt && chmod 640 /var/lib/postgresql/testCA.crt
RUN chown 0:70 /var/lib/postgresql/testCA.crl && chmod 640 /var/lib/postgresql/testCA.crl

ENTRYPOINT ["docker-entrypoint.sh"] 

CMD [ "-c", "ssl=on" , "-c", "ssl_cert_file=/var/lib/postgresql/postgres.crt", "-c",\
    "ssl_key_file=/var/lib/postgresql/postgres.key", "-c",\
    "ssl_ca_file=/var/lib/postgresql/testCA.crt", "-c", "ssl_crl_file=/var/lib/postgresql/testCA.crl" ]