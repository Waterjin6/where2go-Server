export async function getSavedEventRow(connection, uid){
  
    const getSavedEventsQuery = `
      Select  visitedID, 
      (select pic from EventTBL where EventTBL.eventID = UserVisitedTBL.eventID) as pic from UserVisitedTBL 
      where userID = ?;
      `;
    const getRows = await connection.query(getSavedEventsQuery, uid);
  
    return getRows[0];
};

export async function insertSavedEvent(connection, uid, eid){
  
  const putSavedEventsQuery = `
      insert into UserSavedTBL (userID, eventID) VALUES (?,?); 
    `;
  const getRows = await connection.query(putSavedEventsQuery, [uid, eid]);

  return getRows[0];
};

export async function deleteSavedEvent(connection, uid, eid){
  
  const deleteSavedEventsQuery = `
      delete from UserSavedTBL where userID = ? and eventID = ?; 
    `;
  const getRows = await connection.query(deleteSavedEventsQuery, [uid, eid]);

  return getRows[0];
};

export async function checkSavedEventRow(connection, uid, eid){
  
  const deleteSavedEventsQuery = `
      select count(*) as isSaved from UserSavedTBL where userID = ? and eventID = ?; 
    `;
  const getRows = await connection.query(deleteSavedEventsQuery, [uid, eid]);

  return getRows[0];
};