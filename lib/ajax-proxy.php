<?php

$pod_mode = false;

if ($pod_mode) {
	set_include_path('/home/urn4u9k1/php'); // for production
} else {
	$er = error_reporting(0);

	date_default_timezone_set('Australia/ACT');

	set_include_path('/usr/lib/php'); // for development
}

require_once 'HTTP/Client.php';

$route = substr($_SERVER["QUERY_STRING"], 6);
$url = 'http://api.worldbank.org' . $route;

$hc = new HTTP_Client();

$hc->setMaxRedirects(1);

$hc->get($url);

$response = $hc->currentResponse();

$data = $response['body'];

echo $data;


