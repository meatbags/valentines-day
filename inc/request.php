<?php
include_once('define.php');

class Request {
  private $conn;
  public $error;

  function __construct() {
    $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $this->error = $this->conn->connect_errno;
  }

  function __destruct() {
    $this->conn->close();
  }

  public function query($sql) {
    $res = $this->conn->query($sql);
    $data = array();
    while ($row = $res->fetch_assoc()) {
      $data[] = $row;
    }
    $res->close();
    return $data;
  }

  public function preparedQuery($sql, $types, $values) {
    $stmt = $this->conn->prepare($sql);
    if (!is_array($values)) {
      $stmt->bind_param($types, $values);
    } else {
      $stmt->bind_param($types, ...$values);
    }
    $status = $stmt->execute();
    if ($status === false) {
      echo 'ERROR';
    }
    $data = array();
    $res = $stmt->get_result();
    if ($res) {
      while ($row = $res->fetch_assoc()) {
        $data[] = $row;
      }
    }
    $stmt->close();
    return $data;
  }
}
