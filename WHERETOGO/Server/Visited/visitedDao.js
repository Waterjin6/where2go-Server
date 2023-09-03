export async function getVisitedEventRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  pic, 
      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
      from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?); 
    `;
  const getRows = await connection.query(getVisitedEventsQuery, uid);

  return getRows[0];
};

export async function insertVisitedEvent(connection, uid, eid){

const putVisitedEventsQuery = `
    insert into UserVisitedTBL (userID, eventID) VALUES (?,?); 
  `;
const getRows = await connection.query(putVisitedEventsQuery, [uid, eid]);

return getRows[0];
};

export async function deleteVisitedEvent(connection, uid, eid){

const deleteVisitedEventsQuery = `
    delete from UserVisitedTBL where userID = ? and eventID = ?; 
  `;
const getRows = await connection.query(deleteVisitedEventsQuery, [uid, eid]);

return getRows[0];
};

export async function checkVisitedEventRow(connection, uid, eid){

const deleteVisitedEventsQuery = `
    select count(*) as isVisited from UserVisitedTBL where userID = ? and eventID = ?; 
  `;
const getRows = await connection.query(deleteVisitedEventsQuery, [uid, eid]);

return getRows[0];
};
