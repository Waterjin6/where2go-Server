export async function getVisitedEventRow(connection, uid){
  
  const getVisitedEventsQuery = `
      Select eventID, eventName, (select cName from CategoryTBL where CategoryTBL.cCode = EventTBL.kind) as kind, 
      startDate, endDate,  
      (select visitedID from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.userID = ?) as visitedID,
      (select pic1 from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.userID = ?) as userPic,
      (select star from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID and UserVisitedTBL.userID = ?) as star,
      (Select ifnull (userPic, EventTBL.pic)) as pic, 

      ( select count(*) from UserSavedTBL where UserSavedTBL.eventID = EventTBL.eventID) as savedNum,
      (select count(*) from UserVisitedTBL where UserVisitedTBL.eventID = EventTBL.eventID)as visitedNum 
      
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

export async function getAReviewRow(connection, vid){
  
  const getAReviewQuery = `
      Select * , (select count(*) from ReviewLikeTBL where visitedID = ?) as likeNum, (select 0) as isUserLiked
      from UserVisitedTBL where visitedID = ?;
    `;
  const getRows = await connection.query(getAReviewQuery, [vid, vid]);

  return getRows[0];
};


export async function getMAReviewRow(connection, vid, uid){
  
  const getAReviewQuery = `
      Select * , (select count(*) from ReviewLikeTBL where visitedID = ?) as likeNum, 
      (select count(*) from ReviewLikeTBL where visitedID = ? and userID = ?) as isUserLiked
      from UserVisitedTBL where visitedID = ?;
    `;
  const getRows = await connection.query(getAReviewQuery, [vid, vid, uid, vid]);

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

export async function checkIfPrivate(connection, vid){

  const checkIfIsPrivateQuery = `
      select isPrivate from UserVisitedTBL where visitedID = ?; 
    `;
  const getRows = await connection.query(checkIfIsPrivateQuery, vid);
  
  return getRows[0];
};


export async function getWriterID(connection, vid){

  const getWriterIDQuery = `
      select userID from UserVisitedTBL where visitedID = ?; 
    `;
  const getRows = await connection.query(getWriterIDQuery, vid);
  
  return getRows[0];
};


export async function getReviewList(connection, eid, align){
  var getReviewListQuery = `
      Select * , (select count(*) from ReviewLikeTBL where ReviewLikeTBL.visitedID = UserVisitedTBL.visitedID) as likeNum, 
      (select 0) as isUserLiked 
      from UserVisitedTBL where eventID = ? and isPrivate = 0 and star != -1 ORDER BY
    `;
  
    if(align == 'old'){
      getReviewListQuery += ' createdAt ASC;';
    }
  else if(align == 'new'){
      getReviewListQuery += ' createdAt DESC;';
  }
  else {
    getReviewListQuery += ' likeNum DESC;';
  }
  const getRows = await connection.query(getReviewListQuery, eid);

  return getRows[0];
};


export async function getMReviewList(connection, eid, uid, align){
  var getReviewListQuery = `
      Select * , (select count(*) from ReviewLikeTBL where ReviewLikeTBL.visitedID = UserVisitedTBL.visitedID) as likeNum, 
      (select count(*) from ReviewLikeTBL where ReviewLikeTBL.visitedID = UserVisitedTBL.visitedID and userID = ?) as isUserLiked
      from UserVisitedTBL where eventID = ? and isPrivate = 0 and star != -1 ORDER BY `;

  if(align == 'old'){
    getReviewListQuery += ' createdAt ASC;';
  }
else if(align == 'new'){
    getReviewListQuery += ' createdAt DESC;';
}
else {
  getReviewListQuery += ' likeNum DESC;';
}
  const getRows = await connection.query(getReviewListQuery, [uid, eid]);

  return getRows[0];
};

export async function getComVisitInfo(connection, eid){
  const getComVisitInfo = `
  Select companionID, (select content from companionTBL where cpID = companionID)as companion_Name, 
  count(*) / (select count(*) from UserVisitedTBL where eventID = 2569685 and isPrivate = 0 and star != -1) as com_visit_rate
  from UserVisitedTBL where eventID = ? and isPrivate = 0 and star != -1 group by companionID ORDER BY com_visit_rate DESC;
    `;
  const getRows = await connection.query(getComVisitInfo, eid);

  return getRows[0];
};

export async function getComStarInfo(connection, eid, cid){

  var getComStarInfoQuery = 
  `select sum(star)/count(*) as totalStar from UserVisitedTBL where isPrivate = 0 and star != -1 and eventID = ${eid}`;

  if((cid >= 1)&&(cid <= 5)) getComStarInfoQuery += ` and companionID = ${cid} `;

  getComStarInfoQuery += ` ; `;

  const getRows = await connection.query(getComStarInfoQuery);

  return getRows[0];
};