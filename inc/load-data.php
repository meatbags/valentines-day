<?php
include_once('request.php');

function loadData($ref) {
  if (($req = new Request())->error) {
    return null;
  }

  $sql = 'SELECT * FROM card WHERE card_ref = ?';
  $res = $req->preparedQuery($sql, 's', $ref);

  return count($res) > 0 ? $res[0] : null;
}
