<?php
  $searchOption = $_GET["searchoption"];
  $searchTerm =  $_GET["searchterm"];  
  $query_string = "&resources={$searchOption}&query={$searchTerm}";   
  // $url = 'https://comicvine.gamespot.com/api/search/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21&format=json&sort=name:asc&resources='.$searchOption.'&query='.$searchTerm;
  // $url = 'https://comicvine.gamespot.com/api/search/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21&format=json&sort=name:asc&resources=issue&query='.$searchTerm;
  $url = 'https://comicvine.gamespot.com/api/search/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21&format=json&sort=name:asc?' . $query_string;
  $curl_handle=curl_init();
  curl_setopt($curl_handle,CURLOPT_URL, $url);  
  curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
  curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
  $result = curl_exec($curl_handle);
  curl_close($curl_handle);
  echo $result;

?>