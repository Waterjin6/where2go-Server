export async function getKeywordRow(connection, uid){
  
    const getKeywordsQuery = `
        select content from keywordTBL where userID = ? ;
      `;
    const getRows = await connection.query(getKeywordsQuery, uid);
  
    return getRows[0];
};

export async function insertKeyword(connection, uid, keyword){
  
  const putKeywordQuery = `
      insert into keywordTBL (userID, content) VALUES (?,?);
    `;
  const getRows = await connection.query(putKeywordQuery, [uid, keyword]);

  return getRows[0];
};

export async function deleteKeyword(connection, uid, keyword){
  
  const deleteKeywordQuery = `
      delete from keywordTBL where userID =? and content = ?; 
    `;
  const getRows = await connection.query(deleteKeywordQuery, [uid, keyword]);

  return getRows[0];
};

export async function checkKeywordExistRow(connection, uid, keyword){
  
  const checkKeywordQuery = `
      select count(*) as isExist from KeywordTBL where userID = ? and content = ?; 
    `;
  const getRows = await connection.query(checkKeywordQuery, [uid, keyword]);

  return getRows[0];
};