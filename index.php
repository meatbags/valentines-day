<?php
include('inc/load-data.php');
$res = isset($_GET['ref']) ? loadData($_GET['ref']) : null;
?>

<!DOCTYPE html>
<html>
<head>
  <title>VALENTINE'S DAY</title>
	<meta name='description' content=''>
  <meta name='keywords' content=''>
  <meta name='author' content='http://xavierburrow.com'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'>
	<meta property='og:url' content=''>
	<meta property='og:title' content=''>
	<meta property='og:image' content=''>
	<meta property='og:site_name' content=''>
	<meta property='og:description' content=''>
  <link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap' rel='stylesheet'>
  <link rel='icon' type='image/png' href='favicon.png'>
	<script type='text/javascript'>
		//<![CDATA[
			var SITE_URL = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>';
		//]]>
	</script>
</head>
<body>
  <div id='app-target' class='wrapper'>
    <div class='ui'></div>
    <div id='canvas-target' class='canvas-wrapper'>
      <!-- CANVAS LOADS HERE -->
    </div>
  </div>
  <div class='loading'>
    <div class='loading__inner'>
      <!-- LOGO -->
    </div>
  </div>
</body>
</html>
