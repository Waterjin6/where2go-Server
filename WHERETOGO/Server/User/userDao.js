export async function selectVisitedEvent(connection, uid) {
    const selectVisitedEventsQuery = `
    Select  visitedID, 
    (select pic from EventTBL where EventTBL.eventID = UserVisitedTBL.eventID) as pic 
    from UserVisitedTBL where userID = ?;		
    `;
    const [eventRows] = await connection.query(selectVisitedEventsQuery);
    return eventRows;
  }

