# -*- coding: utf-8 -*-

import Queue
import threading
from urllib2 import Request, urlopen, URLError, HTTPError
import time
import re
import os
import json
from urlparse import urlparse

proxy_url = "https://g-proxy.appspot.com/"
wb_url = "http://api.worldbank.org/"
bases = ["sources", "countries", "incomeLevels", "indicators", "lendingTypes", "topics"]

readTotalQueue = Queue.Queue()
downloadTotalQueue = Queue.Queue()

class ReadTotalThread(threading.Thread):
    """Threaded Url Grab"""
    def __init__(self, readTotalQueue, downloadTotalQueue, proxyURL = None):
        threading.Thread.__init__(self)
        self.readTotalQueue = readTotalQueue
        self.downloadTotalQueue = downloadTotalQueue
        self.proxy_url = proxyURL

    def run(self):
        while True:
            host = self.readTotalQueue.get()

            url = urlopen(self.proxy_url + host)
            headLine = url.read(200)
            total = re.findall(r'\stotal=\"(\d+)\"\s', headLine, re.M|re.I)

            self.downloadTotalQueue.put(host + "?format=json&per_page="+total.pop() )

            self.readTotalQueue.task_done()

class DownloadTotalThread(threading.Thread):
    """Threaded Url Grab"""
    def __init__(self, downloadTotalQueue, proxyURL = None):
        threading.Thread.__init__(self)
        self.downloadTotalQueue = downloadTotalQueue 
        self.proxy_url = proxyURL

    def run(self):
        while True:
            host = self.downloadTotalQueue.get()

            parsedURL = urlparse(host)

            file_name = parsedURL.path[1:] + ".json"
            file_mode = "b"
            # Open the url
            try:
                print "Downloading ...... : " + host
                f = urlopen(self.proxy_url + host)
                # Open our local file for writing
                local_file = open(file_name, "w" + file_mode)
                #Write to our local file
                local_file.write(f.read())
                local_file.close()

            #handle errors
            except HTTPError, e:
                print "HTTP Error:", e.code, host
            except URLError, e:
                print "URL Error:", e.reason, host

            self.downloadTotalQueue.task_done()


start = time.time()
def main():
    total_queue = 5
    for i in range(5):
        t = ReadTotalThread(readTotalQueue, downloadTotalQueue, proxy_url)
        t.setDaemon(True)
        t.start()

    indicator_list = { "source" : "s", "topic" : "" }
    for key, value in indicator_list.iteritems():
        sources =  json.load(open(key+"s.json", "r"))
        for source in sources[1]:
            path = os.path.join(key, source['id'])
            if not os.path.exists (path):
                os.makedirs (path)
            readTotalQueue.put(wb_url + key + '/' + source['id'] + '/indicator' + value)

    for i in range(5):
        dt = DownloadTotalThread(downloadTotalQueue, proxy_url)
        dt.setDaemon(True)
        dt.start()


    readTotalQueue.join()
    downloadTotalQueue.join()

main()
print "Elapsed Time: %s" % (time.time() - start)

