export async function insertReviewLike(connection, uid, rid){
  
    const insertReviewLikeQuery = `
        insert into ReviewLikeTBL (userID, visitedID) VALUES (?,?); 
      `;
    const getRows = await connection.query(insertReviewLikeQuery, [uid, rid]);
  
    return getRows[0];
  };


  export async function checkSavedEventRow(connection, uid, rid){
  
    const checkSavedEventsQuery = `
        select count(*) as isLiked from ReviewLikeTBL where userID = ? and visitedID = ?; 
      `;
    const getRows = await connection.query(checkSavedEventsQuery, [uid, rid]);
  
    return getRows[0];
  };