<?php
include('inc/getCard.php');
$card = isset($_GET['ref']) ? getCard($_GET['ref']) : null;
$text = $res === null ? 'your message here' : htmlspecialchars($card['text']);
$background = $res === null ? '#fff' : htmlspecialchars($card['background']);
?>
<div id='app-target' class='wrapper' style='background-color:<?php echo $background; ?>'>
  <div class='overlay'>
    <div class='message'>hello</div>
  </div>
  <div id='canvas-target' class='canvas-wrapper'>
    <!-- CANVAS LOADS HERE -->
  </div>
</div>
<div class='loading'>
  <div class='loading__inner'>
    <!-- LOGO -->
  </div>
</div>
