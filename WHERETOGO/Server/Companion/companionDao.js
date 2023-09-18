export async function getListRow(connection){
  
    const getListQuery = `
        Select * from CompanionTBL;
      `;
    const getRows = await connection.query(getListQuery);
  
    return getRows[0];
};