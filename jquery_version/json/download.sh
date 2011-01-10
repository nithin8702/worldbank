
proxy_url="http://g-proxy.appspot.com/"
wb_url="http://api.worldbank.org/"

bases=(sources countries incomeLevels indicators lendingTypes topics)
parameter="?format=json&page=1&per_page=4000"

for base in ${bases[@]}
do
    echo ${proxy_url}${wb_url}${base}${parameter}
    curl ${proxy_url}${wb_url}${base}${parameter} --O ${base}.json 
    # other stuff on $name
done

python download.py
