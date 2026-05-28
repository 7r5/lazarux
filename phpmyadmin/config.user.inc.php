<?php
$cfg['blowfish_secret'] = 'change_me_to_a_secure_random_string';

$databaseUrl = getenv('DATABASE_URL');
if ($databaseUrl !== false) {
    if (strpos($databaseUrl, 'DATABASE_URL=') === 0) {
        $databaseUrl = substr($databaseUrl, strlen('DATABASE_URL='));
    }

    $databaseUrl = str_replace('mysql+pymysql://', 'mysql://', $databaseUrl);
    $parsed = parse_url($databaseUrl);

    if ($parsed !== false) {
        if (!empty($parsed['host'])) {
            $cfg['Servers'][1]['host'] = $parsed['host'];
        }
        if (!empty($parsed['port'])) {
            $cfg['Servers'][1]['port'] = $parsed['port'];
        }
        if (!empty($parsed['user'])) {
            $cfg['Servers'][1]['user'] = $parsed['user'];
        }
        if (!empty($parsed['pass'])) {
            $cfg['Servers'][1]['password'] = $parsed['pass'];
        }
        if (!empty($parsed['path'])) {
            $cfg['Servers'][1]['auth_type'] = 'config';
            $cfg['Servers'][1]['only_db'] = ltrim($parsed['path'], '/');
        }
    }
}

$cfg['Servers'][1]['ssl'] = true;
$cfg['Servers'][1]['ssl_verify'] = false;
$cfg['Servers'][1]['connect_type'] = 'tcp';
$cfg['Servers'][1]['AllowNoPassword'] = false;
$cfg['ServerDefault'] = 1;
$cfg['LoginCookieValidity'] = 1440;
$cfg['SendErrorReports'] = 'never';
