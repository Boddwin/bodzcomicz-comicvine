<?php
   $searchTerm =  $_GET["searchterm"];
   $searchOption = $_GET["searchoption"];
$url = 'https://comicvine.gamespot.com/api/search/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21&format=json&sort=name:asc&resources='.$searchOption.'&query='.$searchTerm;
$curl_handle=curl_init();
  // curl_setopt($curl_handle,CURLOPT_URL,'https://comicvine.gamespot.com/api/volumes/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21');
  //curl_setopt($curl_handle,CURLOPT_URL, 'https://comicvine.gamespot.com/api/search/?api_key=d51adb6cf15fee230e5015b8933588ed3f96fa21&format=json&sort=name:asc&resources=issue&query=2000AD');
  curl_setopt($curl_handle,CURLOPT_URL, $url);
  
  curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
  curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
  $result = curl_exec($curl_handle);
  curl_close($curl_handle);
  echo $result;

  ?>