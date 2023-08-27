// 유저 생성
  export async function insertUser(connection, insertUserTBLParams) {
  
  const insertUserTBLQuery = `
        INSERT INTO UserTBL(email, pw, nickName, age, sex)
        VALUES (?, ?, ?, ?, ?);
    `;
  const insertUserTBLRow = await connection.query(
    insertUserTBLQuery,
    insertUserTBLParams
  );

  return insertUserTBLRow;
}

// 이메일로 회원 조회
export async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT userID, email, nickName 
                FROM UserTBL 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
export async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT userID
        FROM UserTBL 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

// 패스워드 체크
export async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickName, pw
        FROM UserTBL 
        WHERE email = ? AND pw = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

export async function updateUserNN(connection, uid, nickName) {
  const updateUserQuery = `
  UPDATE UserTBL 
  SET nickName = ?
  WHERE userID = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickName, uid]);
  return updateUserRow[0];
}