<?php

$pod_mode = false;

if ($pod_mode) {
	set_include_path('/home/urn4u9k1/php'); // for production
} else {
	error_reporting( E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	date_default_timezone_set('Australia/ACT');

	set_include_path('/usr/lib/php'); // for development
}

require_once 'HTTP/Client.php';
require_once "Cache/Lite.php";

$options = array(
    'cacheDir' => '../data/cache/',
    'lifeTime' => 60 * 60 * 24 * 7,
    'pearErrorMode' => CACHE_LITE_ERROR_DIE
);
$cache = new Cache_Lite($options);

$route = substr($_SERVER["QUERY_STRING"], 6);

if ($data = $cache->get($route)) {
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
    echo $data;
} else { 
	$parsed_url = parse_url($route);
	if ( $parsed_url ) {
		if( array_key_exists("host", $parsed_url) )
		{ 
		    $url = $route;
		} else {
		    $url = 'http://api.worldbank.org' . $route;
		}
	} else {
		$url = 'http://api.worldbank.org' . $route;
	}
	$hc = new HTTP_Client();
	
	$hc->setMaxRedirects(1);
	
	$hc->get($url);
	
	$response = $hc->currentResponse();
	
	$headers = $response['headers'];
	$data = $response['body'];
	
	foreach ($headers as $k => $v) {
		header($k . ': ' . $v);
	}
	
	echo $data;
	$cache->save($data, $route);
}
