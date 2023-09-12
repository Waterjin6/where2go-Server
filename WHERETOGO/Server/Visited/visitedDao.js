export async function getVisitedEventRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  
      (select pic1 from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and userVisitedTBL.userID = ?) as userPic,
      (Select ifnull (userPic, EventTBL.pic)) as pic, 
      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
      from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?);
    `;
  const getRows = await connection.query(getVisitedEventsQuery, [uid,uid]);

  return getRows[0];
};

export async function getReviewsRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  
      (select pic1 from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and userVisitedTBL.userID = ?) as userPic,
      (Select ifnull (userPic, EventTBL.pic)) as pic, 
      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
      from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?);
    `;
  const getRows = await connection.query(getVisitedEventsQuery, [uid,uid]);

  return getRows[0];
};


export async function insertVisitedEventSimple(connection, uid, eid){
  const putVisitedEventsSimpleQuery = `
  insert into UserVisitedTBL (userID, eventID) VALUES (?,?); 
`;
const getRows = await connection.query(putVisitedEventsSimpleQuery, [uid, eid]);

return getRows[0];
};

export async function insertVisitedEvent(connection, uid, eid, star, companionID, picList, review, isPrivate){

const putVisitedEventsQuery = `
    insert into UserVisitedTBL (userID, eventID, star, companionID, 
      pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10,
      review, isPrivate) VALUES (?,?,?,?,?,?,?); 
  `;
const getRows = await connection.query(putVisitedEventsQuery, [uid, eid, star, companionID, picList, review, isPrivate]);

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

const checkVisitedEventsQuery = `
    select count(*) as isVisited from UserVisitedTBL where userID = ? and eventID = ?; 
  `;
const getRows = await connection.query(checkVisitedEventsQuery, [uid, eid]);

return getRows[0];
};