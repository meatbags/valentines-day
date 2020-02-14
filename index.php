<?php
include_once('inc/define.php');
include('inc/get-card.php');

$card = isset($_GET['ref']) ? getCard($_GET['ref']) : null;
$editable = $card === null;
$text = $editable ? 'your message' : htmlspecialchars($card['card_text']);
$text = str_replace('&amp;lt;br&amp;gt;', '<br />', $text);
$text = str_replace('&amp;lt;', '&lt;', $text);
$text = str_replace('&amp;gt;', '&gt;', $text);
$token = $editable ? getCardToken() : $card['card_token'];
$baseUrl = ENV === 'DEV' ? 'http://localhost/valentines-day/' : 'https://www.valentinesday.dev/';
$url = $baseUrl . '?ref=' . $token;
$colourBackground = $editable ? '#fdd' : htmlspecialchars($card['card_colour_background']);
$colourText = $editable ? "#ff6f61" : htmlspecialchars($card['card_colour_text']);
$colourPetals = $editable ? "#800" : htmlspecialchars($card['card_colour_petals']);
$colourStem = $editable ? "#060" : htmlspecialchars($card['card_colour_stem']);
?>

<?php include('header.php'); ?>

<div id='app-target' class='wrapper'>
  <div id='overlay-target' class='overlay <?php echo $editable ? 'editable': ''?>'>
    <div class='overlay__inner'>
      <!-- CARD -->
      <div id='card-message' class='message'>
        <?php echo $text; ?>
      </div>

      <!-- EDITOR -->
      <div class='overlay__controls'>
        <div class='overlay__controls-inner'>
          <div class='section'>
            <div class='title'>Your message</div>
            <div class='row'><label>Message</label><textarea rows='2' name='text' value='<?php echo $text; ?>'><?php echo $text; ?></textarea></div>
          </div>
          <div class='section'>
            <div class='title'>Edit Colour Codes</div>
            <input hidden type='text' name='token' value='<?php echo $token; ?>'>
            <div class='row'><label>Background</label><input type='text' name='colour_background' size='7' value='<?php echo $colourBackground; ?>'></div>
            <div class='row'><label>Text</label><input type='text' name='colour_text' size='7' value='<?php echo $colourText; ?>'></div>
            <div class='row'><label>Petals</label><input type='text' name='colour_petals' size='7' value='<?php echo $colourPetals; ?>'></div>
            <div class='row'><label>Stem</label><input type='text' name='colour_stem' size='7' value='<?php echo $colourStem; ?>'></div>
            <!-- <div class='row'><div id='button-save' class='button'>SAVE</div></div> -->
          </div>
          <div id='section-url' class='section hidden'>
            <div class='title'>Your Unique URL</div>
            <div class='row' id='url-target'><?php echo $url; ?></div>
            <div class='row'>
              <div class='button'>
                <a target='_blank' href='<?php echo $url; ?>'>PREVIEW</a>
              </div>
              <div id='button-copy-url' data-clipboard-target="#url-target" class='button'>
                <i class="material-icons">file_copy</i>&nbsp;COPY LINK
              </div>
            </div>
          </div>
        </div>
        <!-- MOBILE -->
        <div id='button-mobile' class='overlay__mobile'>
          <span>Edit</span><span>Preview</span>
        </div>
      </div>
    </div>
  </div>
  <div id='canvas-target' class='canvas-wrapper'>
    <!-- CANVAS LOADS HERE -->
  </div>
  <div class='wrapper__lozenge'></div>
</div>
<div class='loading active'>
  <div class='loading__inner'>
    <i class="material-icons">favorite</i>
  </div>
</div>

<?php include('footer.php'); ?>
