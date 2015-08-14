---
layout: page
title: "Imagemagick"
date:  2015-08-14 12:59:06
---

Installation:

{% highlight bash %}
# Needed for processing JPG/PNG files
apt-get install libjpeg62 libpng
apt-get install imagemagick
{% endhighlight %}

Troubleshooting:

Need to install imagemagick:

`Validation failed: Avatar Failed to manipulate with MiniMagick, maybe it is not an image? Original Error: ImageMagick/GraphicsMagick is not installed`

libpng/libjpeg not installed:

{% highlight text %}
A NoMethodError occurred in avatar#update:
private method `format' called for #<MiniMagick::Tool::Identify:0x007f8914a9afe8>
{% endhighlight %}
