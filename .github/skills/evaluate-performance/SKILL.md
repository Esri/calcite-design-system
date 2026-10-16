---
name: evaluate-performance
description: Investigate or validate performance changes in Calcite components using representative scenarios and controlled comparisons.
argument-hint: "[component, implementation, or suspected regression]"
---

# Evaluate Calcite performance

Do not infer performance solely from implementation complexity.

Measure it.

## Define the question

Identify the specific behavior being evaluated, such as:

- initialization
- rendering
- updates
- interaction
- filtering
- observer callbacks
- global event handling

## Isolate the variable

Compare implementations that provide equivalent behavior.

Change one meaningful factor at a time where practical.

## Use representative scenarios

Measure relevant scales such as:

- small
- typical
- large

When component count or item count matters, include multiple sizes.

## Inspect scaling behavior

Pay particular attention to:

- work performed per component
- repeated DOM queries
- observers
- global listeners
- controllers
- layout reads
- style calculations
- repeated iteration through large collections

## Repeat measurements

Run enough iterations to distinguish meaningful trends from noise.

Report results with the scenario and methodology.

Do not report isolated timings as general performance conclusions.

## Interpret

Separate measured findings from hypotheses.

If the benchmark indicates a regression or improvement, explain which implementation behavior likely accounts for it and whether the difference is meaningful for realistic Calcite usage.
