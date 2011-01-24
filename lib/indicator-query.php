<?PHP
error_reporting(E_ERROR | E_WARNING | E_PARSE );

$json = file_get_contents('../extjs_version/json/indicators.json', FILE_USE_INCLUDE_PATH);

$obj = json_decode($json);

if ($_GET["q"]) {
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
	echo json_encode( array('info' => $obj[0], 'results' => $obj[1]) );
}
