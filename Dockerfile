FROM docker.elastic.co/elasticsearch/elasticsearch:7.12.1
# RUN elasticsearch-plugin remove analysis-kuromoji
# RUN elasticsearch-plugin remove analysis-icu
RUN elasticsearch-plugin install analysis-kuromoji
RUN elasticsearch-plugin install analysis-icu
