export async function getVisitedEventRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  
      (select visitedID from UserVisitedTBL where UserVisitedTBL.eventID = eventID and UserVisitedTBL.userID = ?) as visitedID,
      (select pic1 from UserVisitedTBL where UserVisitedTBL.eventID = eventID and UserVisitedTBL.userID = ?) as userPic,
      (select star from UserVisitedTBL where UserVisitedTBL.eventID = eventID and UserVisitedTBL.userID = ?) as star,
      (Select ifnull (userPic, EventTBL.pic)) as pic, 

      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = eventID)as visitedNum 
      
      from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?);
    `;
  const getRows = await connection.query(getVisitedEventsQuery, [uid,uid,uid,uid]);

  return getRows[0];
};

export async function getVEventRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  
      (select pic1 from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.userID = ?) as userPic,
      (Select ifnull (userPic, EventTBL.pic)) as pic, 
      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
      from EventTBL where eventID in (SELECT eventID from UserVisitedTBL where userID = ?);
    `;
  const getRows = await connection.query(getVisitedEventsQuery, [uid,uid]);

  return getRows[0];
};

export async function getAReviewRow(connection, uid, eid){
  
  const getAReviewQuery = `
      Select * from UserVisitedTBL where userID = ? and eventID = ?;
    `;
  const getRows = await connection.query(getAReviewQuery, [uid,eid]);

  return getRows[0];
};


export async function insertVisitedEvent(connection, uid, eid){
  const putVisitedEventsSimpleQuery = `
  insert into UserVisitedTBL (userID, eventID) VALUES (?,?); 
`;
const getRows = await connection.query(putVisitedEventsSimpleQuery, [uid, eid]);

return getRows[0];
};

export async function insertReview(connection, uid, eid, star, companionID, picList, review, isPrivate){

const putReviewQuery = `
    update UserVisitedTBL SET star = ?, companionID = ?, pic1 = ?, pic2 = ?, pic3 = ?, pic4 =?, pic5 = ?, 
    pic6 = ?, pic7 = ?, pic8 = ?, pic9 = ?, pic10 = ?, review = ?, isPrivate = ? 
    where userID = ? and eventID = ?; 
  `;
const getRows = await connection.query(putReviewQuery, [star, companionID, picList[0], picList[1], picList[2], 
  picList[3], picList[4], picList[5], picList[6], picList[7], picList[8], picList[9], review, isPrivate, uid, eid]);

return getRows[0];
};

export async function deleteReview(connection, uid, eid){

  const deleteReviewQuery = `
  update UserVisitedTBL SET star = -1, companionID = 1, pic1 = NULL, pic2 = NULL, pic3 = NULL, pic4 =NULL, pic5 = NULL, 
  pic6 = NULL, pic7 = NULL, pic8 = NULL, pic9 = NULL, pic10 = NULL, review = NULL, isPrivate = 0 
  where userID = ? and eventID = ?;
    `;
  const getRows = await connection.query(deleteReviewQuery, [uid, eid]);
  
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
