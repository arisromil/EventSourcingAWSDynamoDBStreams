function getAggregateState(aggregateId) {
    // Get the latest snapshot
    const snapshot = getLatestSnapshot(aggregateId);

    // Start with snapshot state if available, otherwise empty state
    let state;
    let fromVersion;

    if (snapshot) {
        state = snapshot.state;
        fromVersion = snapshot.version + 1;
    } else {
        state = {};
        fromVersion = 0;
    }

    // Get events after the snapshot
    const events = getEvents(aggregateId, fromVersion);

    // Apply events to build current state
    for (const event of events) {
        state = applyEvent(state, event);
    }

    return state;
}
