<?php
/**
 * Oembed - Configuration
 * 
 * oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.
 *
 * @copyright 2020 Beplas Studio
 *
 * @license MIT
 *
 * @package oembed
 * @version 1.0
 * @author  Beplas Studio <alip@beplasstudio.com>
 * @link    https://beplasstudio.com/
 */
if (!defined('SCHLIX_VERSION'))
    die('No Access');
?>
<p><?= ___('This macro is useful to embed a url in the middle of content text') ?></p>
<h3><?= ___('Usage') ?></h3>
<p><?= ___('Paste url in the content text it will automatically render embed code') ?></p>
<h3><?= ___('Available Providers') ?></h3>
<ul>
    <li><?= ___('Twitter') ?></li>
    <li><?= ___('Youtube') ?></li>
    <li><?= ___('Daily Motion') ?></li>
    <li><?= ___('Facebook') ?></li>
    <li><?= ___('Soundcloud') ?></li>
    <li><?= ___('Vimeo') ?></li>
    <li><?= ___('Amcharts') ?></li>
</ul>