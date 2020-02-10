<?php
namespace Macro;
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

class Oembed extends \SCHLIX\cmsMacro {

    
    protected static $has_this_macro_been_called;
    
    public function Run(&$data, $caller_object, $caller_function, $extra_info = NULL) {
        if (static::$has_this_macro_been_called != 'yes')
        {
            $this->loadTemplateFile('view.macro', compact(array_keys(get_defined_vars())));
            static::$has_this_macro_been_called = 'yes';
        }
        return true;
    }
}
            