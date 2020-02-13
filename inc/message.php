<?php
function message($res, $msg, $data=NULL) {
  return json_encode(
    array('res'  => $res, 'msg'  => $msg, 'data' => $data)
  );
}
