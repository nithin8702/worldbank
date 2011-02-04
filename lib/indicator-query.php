<?PHP
error_reporting(E_ERROR | E_WARNING | E_PARSE );

$json = file_get_contents('../data/json/indicators.json', FILE_USE_INCLUDE_PATH);

$obj = json_decode($json);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

if( array_key_exists("q", $_GET) ) {
	$indicators = array();
	$found_cnt = 0;
	foreach ($obj[1] as $k => $v) {
		if ( preg_match("/".$_GET["q"]."/i", $v->id) || preg_match("/".$_GET["q"]."/i", $v->name) ) {
			array_push($indicators, array('id' => $v->id, 'name' => $v->name));
	        $found_cnt++;
	    } else {
	        // echo "not found <br/>";
	    }
	}
	echo json_encode( array('info' => array('total' => $found_cnt), 'results' => $indicators) );
} else {
	echo json_encode( array('info' => array('total' => 0), 'results' => array()) );
}
