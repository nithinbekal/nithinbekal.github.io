---
title: "Obsidian Bases: Formula for star ratings with half stars"
categories: obsidian
layout: post
date: 2025-11-14
og_image: obsidian-star-ratings-formula.png
---

I recently [started using Obsidian](/posts/logseq-to-obsidian/) and have been enjoying the Bases feature, which lets you create database-like views using structured notes.

I have a bunch of movie ratings in my notes, and I wanted to display them as stars rather than numbers. The ratings are stored as properties on the notes:

```yaml
type: [[Movies]]
rating: 4
```

Now that I have this data, it's easy to create a view by querying for notes of `type: [[Movies]]`, and adding ratings as one of the properties.

![Movie ratings table in Obsidian with numeric ratings](https://s3.us-east-1.amazonaws.com/nithinbekal.com/blog/obsidian-star-ratings/obsidian-movie-ratings-number.png)

I wanted star ratings to make this easier to read. I came across [this article by Tyler Sticka](https://tylersticka.com/journal/obsidian-bases-star-ratings-and-automatic-covers/) with a formula for star ratings:

```javascript
'⭐⭐⭐⭐⭐'.slice(0, rating).split('').map(icon('star'))
```

Here's how it looks:

![Movie ratings table in Obsidian with star icons](https://s3.us-east-1.amazonaws.com/nithinbekal.com/blog/obsidian-star-ratings/obsidian-movie-ratings-lucide-icon.png)

This works for whole numbers, but I use half stars in my ratings. Something rated as 4.5 stars will show up as 4 stars. To add half stars, we need to modify the formula to this:

```javascript
[
  '⭐⭐⭐⭐⭐'.slice(0, rating).split('').map(icon('star')),
  if(number(rating) - number(rating).floor() >= 0.5, icon('star-half'), '')
].flat()
```

This adds a half star when needed: 

![Movie ratings table in Obsidian with emoji stars](https://s3.us-east-1.amazonaws.com/nithinbekal.com/blog/obsidian-star-ratings/obsidian-movie-ratings-lucide-icon-half-star.png)

However, I wasn't too happy with the appearance of the builtin star icons, and I prefer the use of the emoji ⭐️ for this. This makes the first part of the formula much simpler:

```javascript
'⭐⭐⭐⭐⭐'.slice(0, rating)
```

![Movie ratings table in Obsidian with numeric ratings](https://s3.us-east-1.amazonaws.com/nithinbekal.com/blog/obsidian-star-ratings/obsidian-movie-ratings-emoji.png)

Now, there's no half star emoji, so I decided to use the ½ character instead, so the final formula looks like:

```javascript
[
  '⭐⭐⭐⭐⭐'.slice(0, rating),
  if(number(rating) - number(rating).floor() >= 0.5, '½', '')
].flat()
```

This is what the table finally looks like:

![Movie ratings table in Obsidian with numeric ratings](https://s3.us-east-1.amazonaws.com/nithinbekal.com/blog/obsidian-star-ratings/obsidian-movie-ratings-emoji-half-star.png)

I like how easy it is to customize these tables, and how well these [formula functions are documented](https://help.obsidian.md/bases/functions#%60icon()%60). 
