---
sidebar_position: 3
---

# Contributing to the docs

On every page you can find a link to the source file of the page. You can edit the file and create a pull request.

## Using markdown

If you don't know how to use markdown you can look [here](./markdown-features)

## Adding a new page

To add a new page you need to create a new markdown file in the `docs/docs` folder. 

## Adding a new category
If you want to create a new category you need to create a new folder in the `docs/docs` folder and create a new markdown file in it. Also you need to create a _category.json file in the category folder with the following content:

```json
{
  "label": "New category",
  "position": 6,
  "link": {
    "type": "generated-index",
    "description": "Short description of the category."
  }
}
```