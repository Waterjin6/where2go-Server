export async function getSavedEventRow(connection, uid){
  
    const getSavedEventsQuery = `
        Select eventID, eventName, startDate, endDate 
        from EventTBL where eventID in (SELECT eventID from UserSavedTBL where userID = ?);
      `;
    const getRows = await connection.query(getSavedEventsQuery, uid);
  
    return getRows[0];
};