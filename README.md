# Event sourcing with DynamoDB Streams

A small collection of examples and infrastructure snippets for an event-sourcing project using Amazon DynamoDB and AWS Lambda.

## Project layout

```text
src/
  resilience/CircuitBreaker.ts
  event-sourcing/getAggregateState.js
  projections/getOrderFromProjection.js
infrastructure/
  cloudformation/event-processor-error-alarm.yaml
  cloudformation/dead-letter-queue.yaml
```

The files under `src/` are the canonical application-code locations; the CloudFormation snippets are under `infrastructure/cloudformation/`. The original root-level files are retained for compatibility with existing links and consumers.

## Code notes

- `getAggregateState` expects the event-store functions `getLatestSnapshot`, `getEvents`, and `applyEvent` to be supplied by its caller/runtime.
- `getOrderFromProjection` expects a DynamoDB client wrapper to be supplied by its caller/runtime.
- The CloudFormation files are resource snippets, not complete deployable templates. They reference resources such as `EventProcessorFunction` and `EventProcessingDLQ` that must be defined in a containing template.

## Local development

The TypeScript circuit breaker can be type-checked with `npm install` followed by `npm run typecheck`.
