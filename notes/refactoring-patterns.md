---
layout: page
title: "Refactoring Patterns"
date:  2017-02-24 16:54:20
---

## Extract conditionals to hash

```
// bad
var getPeriod = function () {
    switch($scope.date_range) {
        case 'This week':
            return 'this_week'
            break;
        case 'Last week':
            return 'last_week'
            break;
        case 'Last 10 days':
            return 'last_10_days'
            break;
        case 'This month':
            return 'this_month'
            break;
        case 'Last 30 days':
            return 'last_30_days'
            break;
        default:
    }
}

var getPeriod = function () {
  range_dict = {
    'This week': 'this_week',
    'Last week': 'last_week',
    'Last 10 days': 'last_10_days',
    'This month': 'this_month',
    'Last 30 days': 'last_30_days'
  }
  return map[$scope.date_range];
}
```
