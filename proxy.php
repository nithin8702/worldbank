<?php

set_include_path  ("../lib/pear");

require_once 'HTTP/Request2.php';

$config = array(
        'adapter'           => 'HTTP_Request2_Adapter_Curl',
        'connect_timeout'   => 10,
        'timeout'           => 0,
        'use_brackets'      => true,
        'protocol_version'  => '1.1',
        'buffer_size'       => 16384,
        'store_body'        => true,

        'proxy_host'        => 'g-proxy.appspot.com',
        'proxy_port'        => '80',
        'proxy_user'        => '',
        'proxy_password'    => '',
        'proxy_auth_scheme' => '', // self::AUTH_BASIC,

        'ssl_verify_peer'   => true,
        'ssl_verify_host'   => true,
        'ssl_cafile'        => null,
        'ssl_capath'        => null,
        'ssl_local_cert'    => null,
        'ssl_passphrase'    => null,

        'digest_compat_ie'  => false,

        'follow_redirects'  => false,
        'max_redirects'     => 5,
        'strict_redirects'  => false
    );

$req = new HTTP_Request2();
$req->setConfig($config);
$req->setUrl(substr($_SERVER["QUERY_STRING"], 4));

$response = $req->send();
// Output the content-type header and use the content-type of the original file
header("Content-type: " . $response->getHeader("Content-type"));
// And provide the file body
echo $response->getBody();
