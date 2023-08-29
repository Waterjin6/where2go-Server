export async function getKindNameRow(connection, kind) {
  
    const getKindNameQuery = `
        select cName from CategoryTBL where cCode = ?;
      `;
    const getRows = await connection.query(getKindNameQuery, kind);
  
    return getRows[0];
};

export async function getKindListRow(connection) {
  
    const getKindListQuery = `
        select cCode, cName from CategoryTBL;
      `;
    const getRows = await connection.query(getKindListQuery);
  
    return getRows[0];
};
