export async function getSavedEventRow(connection, uid){
  
    const getSavedEventsQuery = `
    Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
    startDate, endDate,  pic, 
    ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
    (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
    from EventTBL where eventID in (SELECT eventID from UserSavedTBL where userID = ?); 
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
  
  const checkSavedEventsQuery = `
      select count(*) as isSaved from UserSavedTBL where userID = ? and eventID = ?; 
    `;
  const getRows = await connection.query(checkSavedEventsQuery, [uid, eid]);

  return getRows[0];
};