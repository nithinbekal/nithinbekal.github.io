---
layout: page
title: "Machine Learning"
date:  2017-01-14 20:38:14
---

## Machine learning day - lecture notes

Notes from Praseed Pai's lecture, Machine learning day - KMUG (Praseed Pai) - 9-JUL-2016

- Analytical thinking vs system thinking
  - analytical
    - break problem down and solve
  - system thinking
    - holistic approach, nonlinear
    - assume dependent vars

- Algorithmic techniques

  - Hilbert space methods
    - proximity queries between datasets
    - Hilbert's 23 problems (esp. pbm #2 and #10)

  - statistical learning
    - types of statistics
      - non parametric statistics
        - categorical/nominal data
        - ordinal data (signifies order)
      - parametric
        - ratio
        - interval

    - descriptive
      - central tendency
      - dispersion
      - association

  - deep learning
    - neural networks

- Algorithmic classification

  - supervised learning
    - classification
    - regression/prediction
      - classification based on numerical data

  - unsupervised
    - clustering
    - dimensionality reduction

  - association analysis
    - apriori
      - eg. Given historical retail data, decide whether customers who purchase
        bread and sugar should be offered a coupon for another product, say beer.
        We can solve this by finding the % of baskets that have beer in addn. to
        bread and sugar.

      - P(Y|X) - prob of Y given X.

              TxnID  | items
            ---------+--------------------
              1      | shoes, shirt, jacket
              2      | shoes, jacket
              3      | shoes, jeans
              4      | shirt, sweatshirt

              items           | Frequency
            ------------------+----------
              shoes           | 75%
              shirt           | 50%
              {shoes, jacket} | 50%

- Decision tree classifier
  - generate decision tree based on inputs

- Naive Bayes
  - initial condition - priori probability
  - adjust probability based on new data
  - assumes independent variables
  - posterior probability - calculate based on priori data
  - eg. given learning data height, weight, foot size, predict gender.
  - read up:
    - false positive % - sensitivity
    - false negative % - specificity
    - base rate
    - monty hall problem
    - Weka - ML tool


# MOOCs

- Caltech ML course by yasser abu mustafa
- Weka MOOC

# Recommended books

- Machine Learning (Tom Mitchell)
- Statistics hacks (Bruce Frey)
- Financial Numerical Recipes in C++ (available online)
- Data Science for Dummies Using Python
- Machine Learning with Scikit Learn - Packt
